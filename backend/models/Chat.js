const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const chatSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  messages: [messageSchema],
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  lastMessage: {
    type: Date,
    default: Date.now
  }
});

// Ensure participants array always has exactly 2 users
chatSchema.pre('save', function(next) {
  if (this.participants.length !== 2) {
    next(new Error('Chat must have exactly 2 participants'));
  }
  next();
});

// Update lastMessage timestamp when a new message is added
chatSchema.pre('save', function(next) {
  if (this.isModified('messages')) {
    this.lastMessage = Date.now();
  }
  next();
});

module.exports = mongoose.model('Chat', chatSchema);
