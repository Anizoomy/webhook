const userModel = require("../models/userModel")

exports.createUser = async (req, res) => {
  try {
    const { username, email, location } = req.body;
    const existingEmail = await userModel.findOne({
      email: email.toLowerCase()
    });

    if (existingEmail) {
      return res.status(400).json({
        statusCode: false,
        statusText: "Bad request",
        message: `User with ${email.toLowerCase()} already exist`
      });
    }
    const user = new userModel({
        username,
        email,
        location
      });
      
      const response = {
        username: user.username,
        location: user.location
      }

      await user.save();
      res.status(201).json({
        statusCode: false,
      statusText: "created",
      message: 'User successfully created',
      data: user
      })
  } catch (error) {
    res.status(500).json({
      statusCode: false,
      statusText: "Internal Server error",
      message: 'Error creating user' + error.message
    })
  }
};