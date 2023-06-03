import { shuffleArray } from "../helperFunctions.js";
import Giveaway from "../models/giveAwayModel.js";
import Essay from "../models/essayModel.js";

const getGiveaways = async (req, res) => {
  let query = {};
  if (req.query.catagory) {
    query.category = { $regex: req.query.catagory, $options: 'i' }
    
  }
  
 
  let limit = req.query.limit || 4;
  let page = req.query.page || 1;
  const skip = (page - 1) * limit;
  let giveaway = await Giveaway.find(query)
    .limit(limit)
    .skip(skip)
    .sort("-createdAt");
  giveaway = shuffleArray(giveaway);
  res.status(200).json({ data: giveaway });
};
const getGiveaway = async (req, res) => {
  const { id } = req.params;

  const giveaway = await Giveaway.findById(id);
  if (!giveaway) throw new CustomError("no giveaway is found", 404);
  res.status(200).json({ data: giveaway });
};
const createGiveaway = async (req, res) => {
  const newGiveaway = new Giveaway(req.body);
  await newGiveaway.save();
  res.status(200).json({ data: newGiveaway });
};
const editGiveaway = async (req, res) => {
  const { id } = req.params;
  const giveaway = await Giveaway.findById(id);
  if (!giveaway) throw new CustomError("no giveaway is found", 404);
  if (req.user._id !== giveaway.userId)
    throw new CustomError("this isnt your giveaway", 401);
  const updatedGiveaway = await Giveaway.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json({ data: updatedGiveaway });
};
const deleteGiveaway = async (req, res) => {
  const { id } = req.params;
  await Giveaway.findByIdAndRemove(id);
  res.status(200).json({ data: "deleted successfully" });
};

const getGiveawayEssay = async (req, res) => {
  const { id } = req.params;
  const comments = await Essay.find({ giveAwayItemId: id }).sort("-createdAt");
  res.status(200).json({ data: comments });
};
export {
  getGiveaways,
  createGiveaway,
  editGiveaway,
  deleteGiveaway,
  getGiveaway,
  getGiveawayEssay,
};
