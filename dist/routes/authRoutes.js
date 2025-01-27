"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.post("/", authController_1.loginUser);
router.post("/logout", authController_1.logoutUser);
router.post("/refresh-token", authController_1.refreshToken);
exports.default = router;
