import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import "express-async-errors";
import path from "path";
import bodyParser from "body-parser";
import fs from "fs";
import { fileURLToPath } from "url";
import notFound from "./middleware/not_found.js";
import errorHandler from "./middleware/error.js";
import {
  createFoundItem,
  createGiveaway,
  createLostItem,
  signupUser,
  createNotice,
} from "./controllers/index.js";

import {
  authRouter,
  essayRouter,
  lostItemRouter,
  foundItemRouter,
  noticeRouter,
  giveAwayRouter,
  userRouter,
} from "./routes/index.js";
import authUser from "./middleware/auth.js";
const log = console.log;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
mongoose.set("strictQuery", false);

const port = process.env.PORT || 5000;
const stream = fs.createWriteStream(path.join(__dirname, "result.log"), {
  flags: "a",
});
const url = process.env.URL;
const app = express();
app.use(express.static("./public"));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(morgan("combined", { stream }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(null, Error("only image is allowd"));
  }
};
const upload = multer({ storage, fileFilter: isImage });

app.post("/api/v1/auth/signup",authUser,upload.single("picture"),signupUser);
app.post("/api/v1/notice", authUser, upload.single("picture"), createNotice);
app.post(
  "/api/v1/lostItem",
  authUser,
  upload.single("picture"),
  createLostItem
);
app.post(
  "/api/v1/foundItem",
  authUser,
  upload.single("picture"),
  createFoundItem
);

app.post(
  "/api/v1/giveaway",
  authUser,
  upload.single("picture"),
  createGiveaway
);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notice", noticeRouter);
app.use("/api/v1/lostItem", lostItemRouter);
app.use("/api/v1/foundItem", foundItemRouter);
app.use("/api/v1/giveaway", giveAwayRouter);
app.use("/api/v1/essay", essayRouter);
app.use("/api/v1/user", userRouter);

app.use("*", notFound);
app.use(errorHandler);
const connectAndListen = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    log("db conected");
    app.listen(port, log(`listning through port number${port}`));
  } catch (error) {
    log(error);
  }
};

connectAndListen();
