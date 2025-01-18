import axios from "axios";
import Payment from "../models/Payment.js";
import UserProgress from "../models/UserProgress.js";
import User from "../models/User.js";
import midtransClient from "midtrans-client";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("../.env") });

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

function calculateGrossAmount(price, amount) {
  const conversionRate = price;
  return amount * conversionRate;
}

function getUserIdFromOrderId(orderId) {
  const userId = orderId.split("-")[2];
  return userId;
}

export const purchase = async (req, res) => {
  const { userId, username, itemDetails, amount } = req.body;

  let total = calculateGrossAmount(itemDetails.price.amount, amount);

  let parameter = {
    transaction_details: {
      order_id: `${username}-${itemDetails._id}-${amount}`,
      gross_amount: total, // price total in IDR
    },
    item_details: [
      {
        id: itemDetails._id, // items id
        name: itemDetails.name,
        price: itemDetails.price.amount,
        quantity: amount, // Number of items purchased
      },
    ],
    customer_details: {
      userId: userId,
      first_name: username,
    },
  };

  try {
    const snapResponse = await snap.createTransactionToken(parameter);
    res.json(snapResponse);
  } catch (error) {
    console.error("Error creating payment:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: "Error creating payment", error: error.response ? error.response.data : error.message });
  }
};


export const notification = async (req, res) => {
  const { order_id, transaction_status, fraud_status, gross_amount, merchant_id } = req.body;
  const slicedId = order_id.split("-");
  const user = await User.findOne({ username: slicedId[0] });
  const purchaseDetails = {
    userId: user._id,
    itemId: slicedId[1],
    amount: slicedId[2],
  };

  if (mechant_id === process.env.MIDTRANS_MERCHANT_ID) {
    if (transaction_status === "settlement" || transaction_status === "capture") {
      if (fraud_status === "accept") {
        try {
            const response = await axios({
                method: "post",
                url: `${process.env.BACKEND_SERVER}/progress/${userId}/additem/${itemId}`,
                body: {
                    amount: amount
                },
                headers: {
                  "x-api-key": process.env.API_KEY,
                },
              });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
      }
    }
  }

  res.sendStatus(200);
};
