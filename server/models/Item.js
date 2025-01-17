import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      priceType: {
        type: String,
        required: true,
        enum: ["Free", "Scoin", "Scash"],
      },
      amount: {
        type: Number,
        required: true,
      },
    },
    category: {
      type: String,
      enum: ["scoin", "scash", "booster", "avatar"],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    attribute: {
      boost: {
        type: String,
        enum: ["scoins", "scores"],
        required: true,
      },
      activeTime: {
        type: Number,
        required: true,
      },
    },
  }
)

export default mongoose.Model("Item", item)