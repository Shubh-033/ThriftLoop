const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxLength: 500
  },
  type: {
    type: String,
    enum: ['buyer', 'seller'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent multiple reviews for same transaction
reviewSchema.index(
  { reviewer: 1, reviewed: 1, product: 1, type: 1 },
  { unique: true }
);

// Calculate average rating for a user
reviewSchema.statics.calculateAverageRating = async function(userId) {
  const result = await this.aggregate([
    {
      $match: { reviewed: mongoose.Types.ObjectId(userId) }
    },
    {
      $group: {
        _id: '$type',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);
  
  // Update user's rating in User model
  const ratings = {
    buyer: { rating: 0, count: 0 },
    seller: { rating: 0, count: 0 }
  };
  
  result.forEach(item => {
    ratings[item._id] = {
      rating: Math.round(item.averageRating * 10) / 10,
      count: item.totalReviews
    };
  });
  
  await mongoose.model('User').findByIdAndUpdate(userId, {
    ratings: ratings
  });
};

// Update average rating after save
reviewSchema.post('save', async function() {
  await this.constructor.calculateAverageRating(this.reviewed);
});

module.exports = mongoose.model('Review', reviewSchema);
