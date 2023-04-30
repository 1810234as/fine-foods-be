import dotenv from "dotenv";
import express from "express";
import {
  authUser,
  registerUser,
} from "../controllers/userController.js";

dotenv.config();

const router = express.Router();

router.post("/login", authUser);
router.post("/register", registerUser);

export default router;