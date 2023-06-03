import mongoose from "mongoose";
const foundItemSchema = new mongoose.Schema({
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
  userAddress: [
    {
      type: String,
      required: true,
    },
  ],
  claimQuestions: [
    {
      question: { type: String },
      answers: [{ type: String }],
    },
  ],
  claimQuestionAnswers: [
    {
      type: Number,
    },
  ],
});

export default mongoose.model("FoundItem", foundItemSchema);
