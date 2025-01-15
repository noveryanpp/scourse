import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
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