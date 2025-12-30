const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    trim: true
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  location: {
    type: String,
    trim: true
  },
  productId: [
    {
      type: mongoose.Schema.Types.Object,
      ref: 'products'
    }
  ],
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1
      }
    }
  ]
}, {
  timestamp: true
});

const userModel = mongoose.model('users', userSchema)

module.exports = userModel