const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories', 'Shoes', 'Other']
  },
  images: [{
    type: String,
    required: [true, 'At least one image is required']
  }],
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'sold', 'pending'],
    default: 'active'
  },
  size: {
    type: String,
    required: [true, 'Size is required'],
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size']
  },
  condition: {
    type: String,
    required: [true, 'Condition is required'],
    enum: ['New', 'Like New', 'Good', 'Fair']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add text index for search functionality
productSchema.index({ 
  title: 'text', 
  description: 'text', 
  category: 'text' 
});

module.exports = mongoose.model('Product', productSchema);
