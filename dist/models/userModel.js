"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.userExists = exports.getUsers = void 0;
const db_1 = __importDefault(require("../config/db"));
const getUsers = async () => {
    const res = await db_1.default.query('SELECT * FROM users');
    return res.rows;
};
exports.getUsers = getUsers;
const userExists = async (username) => {
    const res = await db_1.default.query('SELECT * FROM users WHERE username = $1', [username]);
    return res.rowCount ? res.rowCount > 0 : false;
};
exports.userExists = userExists;
const addUser = async (username, password) => {
    const uuid = crypto.randomUUID();
    await db_1.default.query('INSERT INTO users (uuid, username, password) VALUES ($1, $2, $3)', [uuid, username, password]);
    return uuid;
};
exports.addUser = addUser;
