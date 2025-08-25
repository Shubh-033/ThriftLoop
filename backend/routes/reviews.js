const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Review = require('../models/Review');
const Product = require('../models/Product');

// Create a review
router.post('/', auth, async (req, res) => {
  try {
    const { reviewed, product, rating, comment, type } = req.body;
    
    // Verify the transaction
    const productDoc = await Product.findById(product);
    if (!productDoc) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Verify reviewer is either buyer or seller
    if (type === 'buyer' && productDoc.seller.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Only the seller can leave a buyer review' });
    }
    if (type === 'seller' && productDoc.seller.toString() === req.user.id) {
      return res.status(403).json({ error: 'Only the buyer can leave a seller review' });
    }

    const review = new Review({
      reviewer: req.user.id,
      reviewed,
      product,
      rating,
      comment,
      type
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'You have already reviewed this transaction' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// Get reviews for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { type, sort = '-createdAt' } = req.query;
    const query = { reviewed: req.params.userId };
    
    if (type) {
      query.type = type;
    }

    const reviews = await Review.find(query)
      .sort(sort)
      .populate('reviewer', 'name avatar')
      .populate('product', 'title images');

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get review summary for a user
router.get('/user/:userId/summary', async (req, res) => {
  try {
    const summary = await Review.aggregate([
      {
        $match: { reviewed: req.params.userId }
      },
      {
        $group: {
          _id: '$type',
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
          ratingDistribution: {
            $push: '$rating'
          }
        }
      }
    ]);

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
