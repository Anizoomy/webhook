const userModel = require('../models/userModel');
const productModel = require('../models/productModel');

exports.addCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const { quantity = 1 } = req.body;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        if (!product.isAvailable || product.quantity < quantity) {
            return res.status(400).json({
                message: 'Product not available'
            });
        }

        const items = user.cart.findIndex(
            item => item.product.toString() === productId
        );

        if (items > -1) {
            user.cart[items].quantity += quantity;
        } else {
            user.cart.push({
                product: productId,
                quantity
            });
        }

        await user.save();

        res.status(200).json({
            message: 'Product added successfully',
            cart: user.cart
        })
    } catch (error) {
      res.status(500).json({
        statusCode: false,
        statusText: "Internal Server error",
        message: 'Error creating user' + error.message
    })
  } 
}