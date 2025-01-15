import mongoose from "mongoose";

const singleSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  }
);

const sectionSchema = new mongoose.Schema(
  {
   course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    sections: [singleSectionSchema],
  },
);

export default mongoose.model("Section", sectionSchema);