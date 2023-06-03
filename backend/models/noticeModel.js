import mongoose from "mongoose";
const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    year: {
      type: String,
      enum: {
        values: ["all", "first", "second", "third", "forth", "fifth"],
        message: "invalid year of study",
      },
    },
    typeOfProgram: {
      type: String,
      enum: {
        values: ["regular", "extension"],
        message: "invalid type of program",
      },
    },
    userId: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    attachmentUrl: { type: String },
    imgUrl: { type: String },
    tags: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("Notice", noticeSchema);
