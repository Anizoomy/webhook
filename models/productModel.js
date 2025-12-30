const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  userId: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  productName: {
    type : String,
    require: true,
    trim: true,
    unique: true
  }, 
  unitPrice: {
    type : Number,
    require: true,
    trim: true
  },
  totalPrice: {
    type : Number,
    require: true,
    trim: true
  },
  quantity: {
    type: Number,
    require: true,
    trim: true
  },
  isAvailable: {
    type: Boolean,
    require: true,
  },
}, {
  timestamp: true
});

const productModel = mongoose.model('products', productSchema)

module.exports = productModel;