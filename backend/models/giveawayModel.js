import mongoose from "mongoose";

const giveawaySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userPicturePath: String,
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Give_away", giveawaySchema);
