import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    currency: {
      type: String,
      required: true,
      enum: ["Scoin", "Scash", "IDR"],
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  category: {
    type: String,
    enum: ["currency", "booster", "avatar"],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  attribute: {
    usage: {
      type: String,
    },
    activeTime: {
      type: Number,
    },
  },
  multiPurchase: {
    type: Boolean,
    required: true,
  }
});

export default mongoose.model("Item", itemSchema);
