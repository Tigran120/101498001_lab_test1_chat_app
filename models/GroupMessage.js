const mongoose = require('mongoose');

const groupMessageSchema = new mongoose.Schema({
  from_user: {
    type: String,
    required: [true, 'from_user is required'],
    trim: true,
  },
  room: {
    type: String,
    required: [true, 'room is required'],
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'message is required'],
    trim: true,
  },
  date_sent: {
    type: String,
    default: () => {
      const now = new Date();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const year = now.getFullYear();
      const hours = now.getHours() % 12 || 12;
      const mins = String(now.getMinutes()).padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      return `${month}-${day}-${year} ${hours}:${mins} ${ampm}`;
    },
  },
});

module.exports = mongoose.model('GroupMessage', groupMessageSchema);
