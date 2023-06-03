import express from "express";
import authUser from "../middleware/auth.js";

import { createEssay } from "../controllers/essayController.js";
const router = express.Router();


router.route("/").post( authUser,createEssay);
export default router;
