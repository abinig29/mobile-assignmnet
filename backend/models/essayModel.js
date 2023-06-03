import mongoose from "mongoose";
const essaySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userProfileImg: {
      type: String,
    },
    giveAwayItemId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Essay", essaySchema);
