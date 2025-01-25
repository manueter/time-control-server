import express from "express";
import {
  createEntry,
  getEntries,
} from "../controllers/entryController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

// Add a new entry (authenticated)
router.post("/add", authenticateToken, createEntry);

// Get all entries (authenticated)
//router.get("/", authenticateToken, getEntries);

router.get("/", getEntries);

export default router;