const mongoose = require('mongoose');

const priceHistorySchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient querying
priceHistorySchema.index({ product: 1, timestamp: -1 });

module.exports = mongoose.model('PriceHistory', priceHistorySchema);
