const mongoose = require('mongoose');

// Create Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  price: {
    type: Number,
    required: true,
    max: 255,
    min: 6,
  },
  description: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  quantity: {
    type: Number,
    required: true,
    max: 100,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;