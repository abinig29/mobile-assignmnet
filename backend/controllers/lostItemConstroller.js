import { shuffleArray } from "../helperFunctions.js";
import LostItem from "../models/lostItemsModel.js";

const getLostItems = async (req, res) => {
  
  let query = {};
  if (req.query.catagory) {
    query.category = { $regex: req.query.catagory, $options: 'i' }
  }
  let limit = req.query.limit || 4;
  let page = req.query.page || 1;
  const skip = (page - 1) * limit;
  let lostItem = await LostItem.find(query)
    .limit(limit)
    .skip(skip)
    .sort("-createdAt");
  lostItem = shuffleArray(lostItem);
  res.status(200).json({ data: lostItem });
};
const getLostItem = async (req, res) => {
  const { id } = req.params;
  const lostItem = await LostItem.findById(id);
  if (!lostItem) throw new CustomError("no lostItem is found", 404);
  res.status(200).json({ data: lostItem });
};
const createLostItem = async (req, res) => {
  const lostItem = await  LostItem.create(req.body)
  res.status(200).json({ data: lostItem });
};
const editLostItem = async (req, res) => {
  const { id } = req.params;
  const lostItem = await LostItem.findById(id);
  if (!lostItem) throw new CustomError("no LostItem is found", 404);
  if (req.user._id !== lostItem.userId)
    throw new CustomError("this isnt your LostItem", 401);
  const updatedLostItem = await LostItem.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json({ data: updatedLostItem });
};
const deleteLostItem = async (req, res) => {
  const { id } = req.params;
  await LostItem.findByIdAndRemove(id);
  res.status(200).json({ data: "deleted successfully" });
};

export {
  getLostItems,
  createLostItem,
  editLostItem,
  deleteLostItem,
  getLostItem,
};
