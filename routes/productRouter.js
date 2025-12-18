const router = require('express').Router()

const { createProduct } = require("../controllers/productController")

router.post("/product/:id", createProduct);

module.exports = router