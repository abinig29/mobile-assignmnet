import express from "express";
import authUser from "../middleware/auth.js";
import { authorize } from "../middleware/authorize.js";
import {
  getNotices,
  createNotice,
  editNotice,
  deleteNotice,
} from "../controllers/noticeController.js";
const router = express.Router();
router.route("/").get(authUser,getNotices).post(authUser, createNotice);
router.route("/:id").patch(authUser,authorize("admin"), editNotice).delete(authUser, authorize("admin"),deleteNotice);
export default router;
