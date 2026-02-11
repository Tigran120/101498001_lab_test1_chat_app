# Chat App - Lab Test 1

A simple real-time chat app. You can sign up, log in, join rooms and chat with others. Messages are saved in MongoDB.

## What it does

- **Sign up** – Create an account with a username (must be unique), first name, last name and password. Data is stored in MongoDB.
- **Login** – Log in with your username and password. The app uses localStorage to keep you logged in.
- **Rooms** – After login you see a list of rooms (e.g. devops, cloud computing, covid19, sports, nodeJS). Click a room to join. You can only send and receive messages in the room you joined.
- **Leave room** – Use the "Leave room" button to leave the current room.
- **Group chat** – Type in the box at the bottom and click Send. Everyone in the same room sees the message in real time. Group messages are stored in MongoDB.
- **Private chat** – In the sidebar you can enter another user’s username and send a private message. Those messages are also saved in MongoDB.
- **Typing** – When someone is typing in the room you see "X is typing...". For private chat you see "X is typing..." in the private chat section.
- **Logout** – Click Logout to clear the session and go back to the login page.

## How to run it

1. Install Node.js if you don’t have it.
2. Make sure MongoDB is running on your machine (e.g. on `localhost:27017`).
3. In the project folder run: `npm install`
4. Start the server: `npm start`
5. Open a browser and go to: `http://localhost:3000`
6. Sign up first, then log in and join a room to chat.

If your MongoDB is on a different URL, set the environment variable `MONGODB_URI` before starting (e.g. `set MONGODB_URI=mongodb://your-url` on Windows).

## Tech used

Backend: Express, Socket.io, Mongoose.  
Frontend: HTML5, CSS, Bootstrap, fetch, jQuery.  
Database: MongoDB (User, GroupMessage, PrivateMessage).


