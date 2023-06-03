import mongoose from "mongoose";
const lostItemSchema = new mongoose.Schema({
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
  imageUrl: String,
  userAddress: [
    {
      type: String,
      required: true,
    },
  ],
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userPicturePath: String,
  location: {
    type: String,
    required: true,
  },
});

export default mongoose.model("LostItem", lostItemSchema);
