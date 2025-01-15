import mongoose from "mongoose";

const userInventorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scores: {
      type: Number,
      default: 0,
    },
    scoins: {
      type: Number,
      default: 100,
    },
    scashes: {
      type: Number,
      default: 0,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    avatars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Avatar",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserInventory = mongoose.models.UserInventory || mongoose.model("UserInventory", userInventorySchema);
export default UserInventory;
