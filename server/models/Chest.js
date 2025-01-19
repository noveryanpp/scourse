import mongoose from "mongoose";

const chestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prizes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
  ],
});
