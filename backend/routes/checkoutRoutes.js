const express = require('express');
const router = express.Router();

const {
    createPaymentIntent,
} = require('../controller/checkoutControllers');

router.put('/create-payment-intent', createPaymentIntent);

module.exports = router;