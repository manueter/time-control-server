"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saltRounds = 10;
const hashPassword = async (password) => {
    try {
        return await bcryptjs_1.default.hash(password, saltRounds);
    }
    catch (error) {
        throw new Error('Failed to hash password');
    }
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcryptjs_1.default.compare(password, hashedPassword);
    }
    catch (error) {
        throw new Error('Failed to compare password');
    }
};
exports.comparePassword = comparePassword;
