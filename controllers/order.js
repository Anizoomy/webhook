const userModel = require('../models/userModel');
const cartModel = require('../models/cart');
const orderModel = require('../models/order');
const axios = require('axios');


exports.makeOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);
    const reference = Math.random().toString(36).substring(2)

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    };

    let products = []
    const totalProducts = await cartModel.find({ userId: user._id })
    totalProducts.forEach((e) => products.push(e._id))
    const totalPrice = await cartModel.find({ userId: user._id })
    const data = {
      customer: {
        email: user.email,
        name: user.username,
      },
      currency: 'NGN',
      reference,
      amount: totalPrice.reduce((a, c) => a + c.price, 1)
    };

    const koraRes = await axios.post('https://api.korapay.com/merchant/api/v1/charges/initialize', data, {
      headers: {
        Authorization: `Bearer ${process.env.KORA}`
      }
    });

    const order = new orderModel({
      userId: user._id,
      productId: products,
      totalPrice: data.amount,
      reference
    })

    await order.save();
    res.status(200).json({
      message: 'Payment initialized successfully',
      data: koraRes.data.data
    })
  } catch (error) {
    res.status(500).json({
      statusCode: false,
      statusText: "Internal Server error",
      message: 'Error making order' + error.message
    })
  }
};

exports.verify = async (req, res) => {
  try {
    // const payload = JSON.parse(req.body.toString());
    const {event, data}= req.body || {};
    const reference = data?.reference || data?.transaction?.reference
    console.log(event);
    console.log(data?.reference);
    const order = await orderModel.findOne({ reference });

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    if (event === 'charge.success') {
      order.status = 'successful'
    } else if (event === 'charge.failed') {
      order.status = 'failed'
    }

    await order.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: false,
      statusText: "Internal Server error",
      message: 'Error verifying order' + error.message,
     
    })
  }
}