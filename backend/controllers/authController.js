import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import { CustomError } from "../error/custom.js";
const signupUser = async (req, res) => {
  console.log()
  const { email, password } = req.body;  
  if (!validator.isEmail(email))
    throw new CustomError("enter valid email", 400);
  let emailCheck = await User.findOne({ email });
  if (emailCheck)
    throw new CustomError("your email is already registered", 401);
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  const newBody = { ...req.body, password: hashedPass };
 
  const user = new User(newBody);
  
  await user.save();
  res.status(201).json({ data: user });
};

const loginUser = async (req, res) => {
  const { email } = req.body;
  let preUser = await User.findOne({ email });
  if (!preUser) throw new CustomError("your email isnt registered", 401);
  const match = await bcrypt.compare(req.body.password, preUser.password);
  if (!match) throw new CustomError("your password is incorrect", 401);
  const token = jwt.sign(
    { id: preUser._id, name: preUser.userName },
    process.env.KEY
  );
  preUser = await User.findOne({ email }).select("-password");
  res.status(201).json({ data: { token, user: preUser } });
};
export { loginUser, signupUser };
