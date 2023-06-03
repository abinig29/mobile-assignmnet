import mongoose from "mongoose";

const useSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: [true, "need to enter user name"],
      max: 20,
    },
    email: {
      type: String,
      required: [true, "need to enter email"],
      unique: [true, "user already exist"],
    },
    password: {
      type: String,
      required: [true, "need to enter password"],
      min: 5,
    },
    YearOfStudy: {
      type: Number,
      required: true,
      enum: {
        values: [1, 2, 3, 4, 5],
        message: "invalid year of study",
      },
    },
    Program: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "student",
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true }
);
useSchema.pre('save', function (next) {
  if (!this.role || this.role === null) {
    this.role = "student"; // Set default value for age
  }

  next();
});
export default mongoose.model("User", useSchema);
