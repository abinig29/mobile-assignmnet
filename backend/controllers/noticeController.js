import Notice from "../models/noticeModel.js";
import { shuffleArray } from "../helperFunctions.js";

const getNotices = async (req, res) => {
  let query = {};

  if (req.query.tags) {
    const tags = req.query.tags.spilt(" ");
    query.tags = { $in: tags };
  }
  if (req.query.year) {
    query.year = req.query.year;
  }
  if (req.query.program) {
    query.typeOfProgram = req.query.program;
  }
  if (req.query.department) {
    query.department = req.query.department;
  }
  let limit = req.query.limit || 4;
  let page = req.query.page || 1;
  const skip = (page - 1) * limit;
  let notice = await Notice.find(query)
    .limit(limit)
    .skip(skip)
    .sort("-createdAt");
  notice = shuffleArray(notice);
  res.status(200).json({ data: notice });
};
const createNotice = async (req, res) => {
  const newNotice = new Notice(req.body);
  await newNotice.save();
  res.status(200).json({ data: newNotice });
};

const editNotice = async (req, res) => {
  const { id } = req.params;
  const notice = await Notice.findById(id);
  if (!notice) throw new CustomError("no user is found", 404);
  if (req.user._id !== notice.userId)
    throw new CustomError("this isnt your notice", 401);
  const updatedNotice = await Notice.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json({ data: updatedNotice });
};

const deleteNotice = async (req, res) => {
  const { id } = req.params;
  await Notice.findByIdAndRemove(id);
  res.status(200).json({ data: "deleted successfully" });
};

export { getNotices, createNotice, editNotice, deleteNotice };
