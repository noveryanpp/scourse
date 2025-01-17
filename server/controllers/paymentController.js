import axios from 'axios';
import Payment from '../models/Payment';
import UserProgress from '../models/UserProgress';
const midtransClient = require('midtrans-client');

const midtrans = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

function calculateGrossAmount(price, amount) {
    const conversionRate = price; 
    return amount * conversionRate;
}

function getUserIdFromOrderId(orderId) {
    const userId = orderId.split('-')[2]
    return userId
}

exports.purchase = async (req, res) => {
    const { userId, userEmail, itemDetails, amount } = req.body;

    const grossAmount = calculateGrossAmount(itemDetails.price, amount)

    let parameter = {
        transaction_details: {
            order_id: `order-scourse-${userId}-${Date.now()}`,
            gross_amount: grossAmount,
        },
        item_details: [
            {
                id: itemDetails._id,
                quantity: amount, // Number of items purchased
            },
        ],
        customer_details: {
            userId: userId,
            email: userEmail,
        }
    };

    try {
        const snapResponse = await midtrans.createTransaction(parameter);
        res.json({ redirectUrl: snapResponse.redirect_url });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).send('Payment creation failed');
    }
};

exports.notification = async (req, res) => {
    const { order_id, transaction_status, gross_amount } = req.body;

    if (transaction_status === 'settlement') {
        const userId = getUserIdFromOrderId(order_id); // Implement this function
        await UserProgress.updateOne({ userId }, { $inc: { coins: gross_amount } });
    }

    res.sendStatus(200);
};