import express from "express";
import {
  createEntry,
  getEntries,
} from "../controllers/entryController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/add", authenticateToken, createEntry);
router.get("/", getEntries);

export default router;