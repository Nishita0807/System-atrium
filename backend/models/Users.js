const mongoose = require('mongoose');

// Schema for individual conversation entries
const conversationSchema = new mongoose.Schema({
  type: { type: String, enum: ['sent', 'received'], required: true },
  content: { type: String, required: true },
});

// Schema for individual message items
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  time: { type: String, required: true },
  avatar: { type: String, required: true }, // Avatar can be a URL or a reference to a static asset
  message: { type: String, required: true }, // Type of message (e.g., Text, WhatsApp, etc.)
  conversation: [conversationSchema], // Array of conversation objects
});

// Full schema for the users collection
const usersSchema = new mongoose.Schema({
  inbox: [messageSchema],
  archived: [messageSchema],
  unread: [messageSchema],
});

// Create the model
const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
