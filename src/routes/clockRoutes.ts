import express from "express";
import {
  getClocks,
  getEntryTypes,
  getServerTime,
} from "../controllers/clockController";

const router = express.Router();

router.get("/server-time", getServerTime);
router.get("/", getClocks);
router.get("/entry-types", getEntryTypes);

export default router;
