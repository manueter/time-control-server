import express from "express";
import {
  loginUser,
  logoutUser,
  refreshToken,
} from "../controllers/authController";

const router = express.Router();

router.post("/", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh-token", refreshToken);

export default router;
