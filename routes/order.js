const router = require('express').Router()

const { makeOrder, verify } = require("../controllers/order")

router.get('/order/:userId', makeOrder);
router.get('/verify', verify);


module.exports = router