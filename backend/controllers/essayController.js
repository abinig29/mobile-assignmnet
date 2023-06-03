import Essay from "../models/essayModel.js";
const createEssay = async (req, res) => {
  console.log(req.body)
  const newComment = new Essay(req.body);
  await newComment.save();
  res.status(201).json({ data: newComment });
};
export { createEssay };
