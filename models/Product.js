const mongoose = require('mongoose');

// Create Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    max: 255,
  },
  imagePath: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;