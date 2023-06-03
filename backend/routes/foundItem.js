import express from "express";
import authUser from "../middleware/auth.js";
import {
  getFoundItems,
  createFoundItem,
  editFoundItem,
  deleteFoundItem,
} from "../controllers/foundItemController.js";
const router = express.Router();

router.route("/").get(authUser,getFoundItems).post(authUser, createFoundItem);
router
  .route("/:id")
  .patch(authUser, editFoundItem)
  .delete(authUser, deleteFoundItem);

export default router;
