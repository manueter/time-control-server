"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntriesForUserByMonth = exports.addEntry = exports.getEntriesForUser = void 0;
const db_1 = __importDefault(require("../config/db"));
const dateUtils_1 = require("../utils/dateUtils");
const getEntriesForUser = async (userUuid, startDate, endDate) => {
    let query = "SELECT * FROM entries WHERE user_uuid = $1";
    const params = [userUuid];
    if (startDate && endDate) {
        query += " AND date BETWEEN $2 AND $3";
        params.push(startDate, endDate);
    }
    const res = await db_1.default.query(query, params);
    return res.rows;
};
exports.getEntriesForUser = getEntriesForUser;
const addEntry = async (userUuid, entryTypeId, clockId) => {
    // Get the current time in your desired local time zone (e.g., 'America/Argentina/Buenos_Aires')
    const localTime = new Date();
    const localTimeZone = 'America/Argentina/Buenos_Aires'; // Change to your country's time zone
    const formattedTime = (0, dateUtils_1.convertToLocalTime)(localTime, localTimeZone); // Use the utility function
    // Insert the entry into the database with the local time
    await db_1.default.query("INSERT INTO entries (user_uuid, entry_type_id, clock_id, date, time) VALUES ($1, $2, $3, CURRENT_DATE, $4)", [userUuid, entryTypeId, clockId, formattedTime]);
};
exports.addEntry = addEntry;
const getEntriesForUserByMonth = async (userUuid, month, year) => {
    const res = await db_1.default.query("SELECT * FROM entries WHERE user_uuid = $1 AND MONTH(date) = $2 AND YEAR(date) = $3", [
        userUuid, month, year
    ]);
    return res.rows;
};
exports.getEntriesForUserByMonth = getEntriesForUserByMonth;
