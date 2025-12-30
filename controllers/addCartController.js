const userModel = require('../models/userModel');
const productModel = require('../models/productModel');
const cartModel = require('../models/cart');

exports.addCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;
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

        const existingCart = await cartModel.findOne({ productId: productId });

        if (existingCart) {
            existingCart.quantity += 1
            existingCart.price = existingCart.price * existingCart.quantity
            await existingCart.save();
            return res.status(200).json({
                message: 'Added to cart'
            })
        };

        const cart = new cartModel({
            userId: user._id,
            productId: product._id,
            price: product.unitPrice
        });
        await cart.save();
        res.status(200).json({
            message: 'Product added successfully',
        })
    } catch (error) {
        res.status(500).json({
            statusCode: false,
            statusText: "Internal Server error",
            message: 'Error creating user' + error.message
        })
    }
}