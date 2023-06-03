import User from "../models/userModel.js";
import LostItem from "../models/lostItemsModel.js";
import FoundItem from "../models/foundItemModel.js";
import Notice from "../models/noticeModel.js";
import Giveaway from "../models/giveAwayModel.js";
import { CustomError } from "../error/custom.js";

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new CustomError("no user is found", 404);
  res.status(200).json({ data: user });
};

const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ data: users });
};
const editUser = async (req, res) => {
  const { id } = req.params;
  console.log("pos1")
  // if (!id == req.user._id.toString())
  //   throw new CustomError("this isnt you ", 401);
  console.log("pos1")
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPass;
  }
  
  const user = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!user) throw CustomError("no user", 404);
  res.status(200).json({ data: user });
};

const getNotice = async (req, res) => {
  let limit = req.query.limit || 4;
  let page = req.query.page || 1;
  const skip = (page - 1) * limit;
  const notice = await Notice.find({ userId: req.params.id })
    .skip(skip)
    .limit(limit);
  res.status(200).json({ data: notice });
};
const getGiveAwayPost = async (req, res) => {
  let limit = req.query.limit || 4;
  let page = req.query.page || 1;
  const skip = (page - 1) * limit;
  const giveaway = await Giveaway.find({ userId: req.params.id })
    .skip(skip)
    .limit(limit);
  res.status(200).json({ data: giveaway });
};
const getLostItemPost = async (req, res) => {
  let limit = req.query.limit || 4;
  let page = req.query.page || 1;
  const skip = (page - 1) * limit;
  const notice = await LostItem.find({ userId: req.params.id })
    .skip(skip)
    .limit(limit);
  res.status(200).json({ data: notice });
};
const getFoundItemPost = async (req, res) => {
  let limit = req.query.limit || 4;
  let page = req.query.page || 1;
  const skip = (page - 1) * limit;
  const giveaway = await FoundItem.find({ userId: req.params.id })
    .skip(skip)
    .limit(limit);
  res.status(200).json({ data: giveaway });
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndRemove(id);
  res.status(200).json({ data: "deleted successfully" });
};

export {
  getUser,
  getUsers,
  editUser,
  getFoundItemPost,
  getLostItemPost,
  getGiveAwayPost,
  getNotice,
  deleteUser,
};
