const stripe = require("stripe")("sk_test_51Jimn1AuWhOT7FbIBOz8bHxvJn5kUaSR1W3zHhvJriwBzsHQd0MGXsRie58GthibZs3ok76lTtNFiVxYmfpl98KZ00hXpLkcrG");
const { findById } = require("../models/Product");
const Product = require('../models/Product');

const calculateOrderAmount = (items) => {
    return items.reduce((price, item) => ((item.price * 100) * item.qty) + price, 0);
}

exports.createPaymentIntent = async (req, res) => {
    const cartItems = req.body;
    // Create a PaymentIntent with the order amount and currency
    const items = JSON.parse(cartItems.body);
    console.log(calculateOrderAmount(items));
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "gbp"
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
        amount: paymentIntent.amount
    });
};