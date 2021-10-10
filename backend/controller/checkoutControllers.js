const stripe = require("stripe")("sk_test_51Jimn1AuWhOT7FbIBOz8bHxvJn5kUaSR1W3zHhvJriwBzsHQd0MGXsRie58GthibZs3ok76lTtNFiVxYmfpl98KZ00hXpLkcrG");

const calculateOrderAmount = items => {
    return 1400;
}


const createPaymentIntent = async (req, res) => {
    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntent.create({
        amount: calculateOrderAmount(items),
        currency: "gbp"
    });

    res.send({
        clientSecret: paymentIntent.client_secret
    });
};

module.exports = {
    createPaymentIntent,
}