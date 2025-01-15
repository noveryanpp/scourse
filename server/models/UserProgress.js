import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    scoins: {
      type: Number,
      default: 100,
    },
    scashes: {
      type: Number,
      default: 0,
    },
    scores: {
      type: Number,
      default: 0,
    },
    items: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
      }
    ],
    avatars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Avatar",
      }
    ],
    achievements: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Achievement",
      }  
    ],
    courses: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
        lastSection: {
          type: Number,
          default: 0,
        },
      }  
    ],
  }
);

export default mongoose.model("UserProgress", userProgressSchema);