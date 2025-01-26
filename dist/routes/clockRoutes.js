"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clockController_1 = require("../controllers/clockController");
const router = express_1.default.Router();
router.get("/server-time", clockController_1.getServerTime);
router.get("/", clockController_1.getClocks);
router.get("/entry-types", clockController_1.getEntryTypes);
exports.default = router;
