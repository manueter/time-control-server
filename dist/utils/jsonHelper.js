"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeJsonFile = exports.readJsonFile = void 0;
// src/utils/jsonHelper.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dataDir = path_1.default.join(__dirname, '../../data/jsondb');
const readJsonFile = (filename) => {
    const filePath = path_1.default.join(dataDir, filename);
    const data = fs_1.default.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};
exports.readJsonFile = readJsonFile;
const writeJsonFile = (filename, data) => {
    const filePath = path_1.default.join(dataDir, filename);
    fs_1.default.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};
exports.writeJsonFile = writeJsonFile;
