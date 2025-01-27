"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntryTypes = exports.getClocks = exports.getServerTime = void 0;
const clockModel_1 = require("../models/clockModel");
const dateUtils_1 = require("../utils/dateUtils");
const getServerTime = (_req, res) => {
    const serverTime_Local = (0, dateUtils_1.convertToLocalTime)(new Date());
    res.status(200).json({ serverTime_Local });
};
exports.getServerTime = getServerTime;
const getClocks = async (_req, res) => {
    try {
        const clocks = await (0, clockModel_1.getClocks)();
        res.status(200).json(clocks);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch clocks." });
    }
};
exports.getClocks = getClocks;
const getEntryTypes = async (_req, res) => {
    try {
        const entryTypes = await (0, clockModel_1.getEntryTypes)();
        res.status(200).json(entryTypes);
    }
    catch (error) {
        console.error('Error fetching entry types:', error);
        res.status(500).json({ message: 'Error fetching entry types.' });
    }
};
exports.getEntryTypes = getEntryTypes;
