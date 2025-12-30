const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  productId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: true,
  }],
  totalPrice: {
    type: Number,
    required: true,
  },
  reference: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'successful', 'failed'],
    default: 'pending'
  }
}, {
  timestamp: true
});

const orderModel = mongoose.model('orders', orderSchema)

module.exports = orderModel;