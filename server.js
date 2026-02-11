const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');

const User = require('./models/User');
const GroupMessage = require('./models/GroupMessage');
const PrivateMessage = require('./models/PrivateMessage');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chat_app';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'view')));
app.use(express.urlencoded({ extended: true }));

// Predefined rooms
const ROOMS = ['devops', 'cloud computing', 'covid19', 'sports', 'nodeJS', 'general', 'tech'];

// ---------- API Routes ----------

// Signup
app.post('/api/signup', async (req, res) => {
  try {
    const { username, firstname, lastname, password } = req.body;
    if (!username || !firstname || !lastname || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const existing = await User.findOne({ username: username.trim() });
    if (existing) {
      return res.status(400).json({ error: 'Username already taken' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username: username.trim(),
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: 'Account created', username: user.username });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already taken' });
    }
    res.status(500).json({ error: err.message || 'Signup failed' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    const user = await User.findOne({ username: username.trim() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    res.json({
      message: 'Login successful',
      user: {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Login failed' });
  }
});

// Get rooms list
app.get('/api/rooms', (req, res) => {
  res.json({ rooms: ROOMS });
});

// ---------- Socket.io ----------

const userSockets = new Map(); // username -> { socketId, room }

io.on('connection', (socket) => {
  const username = socket.handshake.auth?.username;
  if (!username) {
    socket.disconnect(true);
    return;
  }
  userSockets.set(username, { socketId: socket.id, room: null });

  socket.on('join_room', async (roomName) => {
    const r = roomName && roomName.trim();
    if (!r || !ROOMS.includes(r)) {
      socket.emit('error', { message: 'Invalid room' });
      return;
    }
    const prev = userSockets.get(username);
    if (prev && prev.room) {
      socket.leave(prev.room);
      socket.to(prev.room).emit('user_left', { username });
    }
    socket.join(r);
    userSockets.set(username, { socketId: socket.id, room: r });
    socket.emit('room_joined', { room: r });
    socket.to(r).emit('user_joined', { username });
    const msgs = await GroupMessage.find({ room: r }).sort({ _id: 1 }).limit(50).lean();
    socket.emit('room_history', msgs);
  });

  socket.on('leave_room', () => {
    const prev = userSockets.get(username);
    if (prev && prev.room) {
      socket.leave(prev.room);
      socket.to(prev.room).emit('user_left', { username });
      userSockets.set(username, { socketId: socket.id, room: null });
    }
    socket.emit('room_left', {});
  });

  socket.on('group_message', async (text) => {
    const prev = userSockets.get(username);
    if (!prev || !prev.room || !text || !String(text).trim()) return;
    const msg = new GroupMessage({
      from_user: username,
      room: prev.room,
      message: String(text).trim(),
    });
    await msg.save();
    io.to(prev.room).emit('new_group_message', {
      _id: msg._id.toString(),
      from_user: username,
      room: prev.room,
      message: msg.message,
      date_sent: msg.date_sent,
    });
  });

  socket.on('private_message', async (data) => {
    const toUser = data?.to_user;
    const text = data?.message;
    if (!toUser || !text || !String(text).trim()) return;
    const target = userSockets.get(String(toUser).trim());
    const msg = new PrivateMessage({
      from_user: username,
      to_user: String(toUser).trim(),
      message: String(text).trim(),
    });
    await msg.save();
    const payload = {
      _id: msg._id.toString(),
      from_user: username,
      to_user: msg.to_user,
      message: msg.message,
      date_sent: msg.date_sent,
    };
    socket.emit('new_private_message', payload);
    if (target && target.socketId) {
      io.to(target.socketId).emit('new_private_message', payload);
    }
  });

  socket.on('typing_start', (payload) => {
    const prev = userSockets.get(username);
    if (prev && prev.room) {
      socket.to(prev.room).emit('typing', { username, typing: true });
    }
    if (payload && payload.to_user) {
      const toUser = String(payload.to_user).trim();
      const target = userSockets.get(toUser);
      if (target && target.socketId) {
        io.to(target.socketId).emit('typing', { username, typing: true, to_user: toUser });
      }
    }
  });

  socket.on('typing_stop', (payload) => {
    const prev = userSockets.get(username);
    if (prev && prev.room) {
      socket.to(prev.room).emit('typing', { username, typing: false });
    }
    if (payload && payload.to_user) {
      const toUser = String(payload.to_user).trim();
      const target = userSockets.get(toUser);
      if (target && target.socketId) {
        io.to(target.socketId).emit('typing', { username, typing: false, to_user: toUser });
      }
    }
  });

  socket.on('disconnect', () => {
    const prev = userSockets.get(username);
    if (prev && prev.room) {
      socket.to(prev.room).emit('user_left', { username });
    }
    userSockets.delete(username);
  });
});

// ---------- Pages ----------

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'signup.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'login.html'));
});

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'chat.html'));
});

// ---------- Start ----------

mongoose.connect(MONGODB_URI).then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
