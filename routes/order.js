const router = require('express').Router()

const { makeOrder, verify } = require("../controllers/order")

router.get('/order/:userId', makeOrder);
router.post('/verify', verify);


module.exports = router