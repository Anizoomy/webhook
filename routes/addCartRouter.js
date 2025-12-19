const router = require('express').Router()

const { addCart } = require("../controllers/addCartController")

router.post('/cart/:userId/:productId', addCart);


module.exports = router