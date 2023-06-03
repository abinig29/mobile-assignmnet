import express from "express";
import authUser from "../middleware/auth.js";
import {
  createGiveaway,
  getGiveaway,
  editGiveaway,
  deleteGiveaway,
  getGiveawayEssay,
  getGiveaways,
} from "../controllers/giveawayController.js";
const router = express.Router();

router.route("/").get(authUser, getGiveaways).post(authUser, createGiveaway);
router
  .route("/:id")
  .get(authUser, getGiveaway)
  .patch(authUser, editGiveaway)
  .delete(authUser, deleteGiveaway);
router.route("/:id/essay").get(authUser,getGiveawayEssay);
export default router;
