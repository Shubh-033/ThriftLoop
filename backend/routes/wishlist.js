const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Wishlist = require('../models/Wishlist');

// Get user's wishlist
router.get('/', auth, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id })
      .populate('products');
    
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user.id, products: [] });
    }
    
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add product to wishlist
router.post('/:productId', auth, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    
    if (!wishlist) {
      wishlist = await Wishlist.create({ 
        user: req.user.id, 
        products: [req.params.productId] 
      });
    } else if (!wishlist.products.includes(req.params.productId)) {
      wishlist.products.push(req.params.productId);
      await wishlist.save();
    }
    
    res.json(wishlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Remove product from wishlist
router.delete('/:productId', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });
    
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }
    
    wishlist.products = wishlist.products.filter(
      product => product.toString() !== req.params.productId
    );
    
    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
