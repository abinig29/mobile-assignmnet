import express from "express";
import authUser from "../middleware/auth.js";

import {
  getUser,
  getUsers,
  editUser,
  deleteUser,
  getGiveAwayPost,
  getLostItemPost,
  getFoundItemPost,
  getNotice,
} from "../controllers/userController.js";

const router = express.Router();
router.route("/").get( authUser,getUsers);
router
  .route("/:id")
  .get(authUser,getUser)
  .patch(authUser,editUser)
  .delete(authUser, deleteUser);
router.route("/:id/giveAway").get(authUser, getGiveAwayPost);
router.route("/:id/lostItem").get(authUser, getLostItemPost);
router.route("/:id/foundItem").get(authUser, getFoundItemPost);
router.route("/:id/notice").get( authUser,getNotice);
export default router;
