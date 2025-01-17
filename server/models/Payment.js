import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  grossAmount: {
    type: Number,
    required: true,
  },
  itemDetails: {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
});

export default mongoose.model("Payment", paymentSchema);
