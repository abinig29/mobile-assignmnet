import { shuffleArray } from "../helperFunctions.js";
import FoundItem from "../models/foundItemModel.js";
const getFoundItems = async (req, res) => {
  let query = {};
  if (req.query.catagory) {
    query.category = { $regex: req.query.catagory, $options: 'i' }
  }
  let limit = req.query.limit || 4;
  let page = req.query.page || 1;
  const skip = (page - 1) * limit;
  let foundItem = await FoundItem.find(query)
    .limit(limit)
    .skip(skip)
    .sort("-createdAt");
  foundItem = shuffleArray(foundItem);
  res.status(200).json({ data: foundItem });
};
const createFoundItem = async (req, res) => {
  const foundItem = new FoundItem(req.body);
  await foundItem.save();
  res.status(200).json({ data: foundItem });
};
const editFoundItem = async (req, res) => {
  const { id } = req.params;
  const foundItem = await FoundItem.findById(id);
  if (!foundItem) throw new CustomError("no foundItem is found", 404);
  if (req.user._id !== foundItem.userId)
    throw new CustomError("this isnt your foundItem", 401);
  const updatedFoundItem = await FoundItem.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json({ data: updatedFoundItem });
};
const deleteFoundItem = async (req, res) => {
  const { id } = req.params;
  await FoundItem.findByIdAndRemove(id);
  res.status(200).json({ data: "deleted successfully" });
};

export { getFoundItems, createFoundItem, editFoundItem, deleteFoundItem };
