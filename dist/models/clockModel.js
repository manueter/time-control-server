"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEntryType = exports.getEntryTypes = exports.addClock = exports.getClocks = void 0;
const db_1 = __importDefault(require("../config/db"));
const getClocks = async () => {
    const res = await db_1.default.query('SELECT * FROM clocks');
    return res.rows;
};
exports.getClocks = getClocks;
const addClock = async (number, ip) => {
    const res = await db_1.default.query('INSERT INTO clocks (number, ip) VALUES ($1, $2) RETURNING id', [number, ip]);
    return res.rows[0].id;
};
exports.addClock = addClock;
const getEntryTypes = async () => {
    const res = await db_1.default.query('SELECT * FROM entry_types');
    return res.rows;
};
exports.getEntryTypes = getEntryTypes;
const addEntryType = async (clockId, value, description) => {
    await db_1.default.query('INSERT INTO entry_types (clock_id, value, description) VALUES ($1, $2, $3)', [clockId, value, description]);
};
exports.addEntryType = addEntryType;
