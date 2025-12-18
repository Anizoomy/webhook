const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type : String,
    require: true,
    trim: true
  },
  email: {
    type : String,
    require: true,
    trim: true,
    unique: true,
    lowercase: true
  }, 
  location: {
    type : String,
    trim: true
  },
  productId: [
    {
      type: mongoose.Schema.Types.Object,
      ref: 'products'
    }
  ]
}, {
  timestamp: true
});

const userModel = mongoose.model('users', userSchema)

module.exports = userModel