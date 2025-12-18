const userModel = require("../models/userModel");
const productModel = require("../models/productModel");

exports.createProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, unitPrice, quantity } = req.body;
    let available;

    const user = await userModel.findById(id)

    if (!user) {
      return res.status(404).json('User not found')
    };

    if (quantity >= 1) {
      available = true
    } else {
      available = false
    }

    const product = new productModel({
      userId: user._id,
       productName, 
       unitPrice, 
       quantity, 
       totalPrice: unitPrice * quantity,
       isAvailable: available
    });

    await product.save();
    user.productId.push(product._id);
    await user.save();
    res.status(201).json({
      message: 'Product created successfully',
      data: product
    })

  } catch (error) {
    res.status(500).json({
    statusCode: false,
    statusText: "Internal Server error",
    message: 'Error creating user' + error.message
  })
}
};