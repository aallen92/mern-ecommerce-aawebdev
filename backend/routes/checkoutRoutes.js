const express = require('express');
const router = express.Router();

const {
    createPaymentIntent,
} = require('../controller/checkoutControllers');

router.route('/create-payment-intent').post(createPaymentIntent);

module.exports = router;