import express from "express";
import authUser from "../middleware/auth.js";
import {
  getLostItems,
  createLostItem,
  getLostItem,
  editLostItem,
  deleteLostItem,
} from "../controllers/lostItemConstroller.js";
const router = express.Router();

router.route("/").get(authUser, getLostItems).post(authUser, createLostItem);
router
  .route("/:id")
  .get(authUser, getLostItem)
  .patch(authUser, editLostItem)
  .delete(authUser, deleteLostItem);

export default router;
