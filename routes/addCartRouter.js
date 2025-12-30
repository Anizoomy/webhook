const router = require('express').Router()

const { addCart } = require("../controllers/addCartController")

router.get('/cart/:userId/:productId', addCart);


module.exports = router