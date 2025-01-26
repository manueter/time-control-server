"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = exports.readFile = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const readFile = async (filePath) => {
    try {
        const data = await promises_1.default.readFile(filePath, "utf-8");
        return JSON.parse(data);
    }
    catch (err) {
        console.error(`Error reading file: ${filePath}`, err);
        return err;
    }
};
exports.readFile = readFile;
const writeFile = async (filePath, data) => {
    try {
        await promises_1.default.writeFile(filePath, JSON.stringify(data, null, 2));
    }
    catch (err) {
        return err;
    }
};
exports.writeFile = writeFile;
