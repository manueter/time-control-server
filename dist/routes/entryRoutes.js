"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const entryController_1 = require("../controllers/entryController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Add a new entry (authenticated)
router.post("/add", authMiddleware_1.authenticateToken, entryController_1.createEntry);
// Get all entries (authenticated)
//router.get("/", authenticateToken, getEntries);
router.get("/", entryController_1.getEntries);
exports.default = router;
