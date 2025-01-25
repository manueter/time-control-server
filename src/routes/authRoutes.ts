import express from "express";
import {
  loginUser,
  logoutUser,
  refreshToken,
} from "../controllers/authController";

const router = express.Router();

// User login route
router.post("/", loginUser);

// Logout route
router.post("/logout", logoutUser);

// Refresh token route
router.post("/refresh-token", refreshToken);

export default router;
