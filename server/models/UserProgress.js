import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
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
    },
  ],
  avatars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  achievements: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Achievement",
    },
  ],
  courses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
      lastSection: {
        type: Number,
        default: 1,
      },
      isFinished: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

export default mongoose.model("UserProgress", userProgressSchema);


