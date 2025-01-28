"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.userExists = exports.getUsers = exports.getUserCredential = void 0;
const db_1 = __importDefault(require("../config/db"));
const getUserCredential = async (uuid) => {
    try {
        const res = await db_1.default.query("SELECT password FROM users WHERE uuid = $1", [
            uuid,
        ]);
        if (res.rows.length === 0) {
            throw new Error("User not found");
        }
        return res.rows[0].password; // Extract the password field
    }
    catch (error) {
        console.error("Error querying users table:", error);
        throw error;
    }
};
exports.getUserCredential = getUserCredential;
const getUsers = async () => {
    try {
        const res = await db_1.default.query("SELECT uuid, username, email FROM users"); // Use a valid query
        return res.rows;
    }
    catch (error) {
        console.error("Error querying users table:", error);
        throw error; // Propagate the error to the controller
    }
};
exports.getUsers = getUsers;
const userExists = async (email) => {
    try {
        const res = await db_1.default.query("SELECT * FROM users WHERE email = $1", [
            email
        ]);
        return res.rowCount ? res.rowCount > 0 : false;
    }
    catch (error) {
        console.error("Error checking if user exists:", error);
        throw error; // Propagate to the controller for consistent error handling
    }
};
exports.userExists = userExists;
const addUser = async (email, username, password) => {
    const uuid = crypto.randomUUID();
    try {
        await db_1.default.query("INSERT INTO users (uuid, email, username, password) VALUES ($1, $2, $3, $4)", [uuid, email, username, password]);
        return uuid;
    }
    catch (error) {
        console.error("Error adding user:", error);
        throw new Error("Failed to add user"); // Provide a meaningful error message
    }
};
exports.addUser = addUser;
