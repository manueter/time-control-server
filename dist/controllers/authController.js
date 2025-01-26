"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.logoutUser = exports.loginUser = void 0;
const hashUtils_1 = require("../utils/hashUtils");
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY = process.env.S_KEY ?? '';
// Function to validate input data
const validateInput = (email, username, password) => {
    return !!(email ?? username) && !!password;
};
const findUser = (users, email, username) => {
    if (email) {
        return users.find((u) => u.email === email);
    }
    else if (username) {
        return users.find((u) => u.username === username);
    }
    return null;
};
const loginUser = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        // Validate input data
        if (!validateInput(email, username, password)) {
            res.status(400).json({ message: 'Email/username and password are required.' });
            return;
        }
        // Get users
        const usersData = await (0, userModel_1.getUsers)();
        const user = findUser(usersData, email, username);
        // Check if the user exists
        if (!user) {
            res.status(400).json({ message: 'Invalid email/username or password.' });
            return;
        }
        // Compare the provided password with the hashed password
        const isPasswordValid = await (0, hashUtils_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid email/username or password.' });
            return;
        }
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ user_uuid: user.uuid }, SECRET_KEY, { expiresIn: '1h' });
        console.log(token);
        // Send the response with the token
        res.status(200).json({
            message: 'Login successful!',
            token,
            user_uuid: user.uuid,
        });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An error occurred during login.' });
    }
};
exports.loginUser = loginUser;
// Logout user (Client-side)
const logoutUser = (_req, res) => {
    // JWT-based authentication doesn't require server-side logout logic
    //console.log(req);
    res.status(200).json({ message: 'User logged out successfully.' });
};
exports.logoutUser = logoutUser;
const refreshToken = (req, res) => {
    const { token } = req.body;
    if (!token) {
        res.status(401).json({ message: "Token is required" });
        return;
    }
    try {
        // Verify the expired token
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY, { ignoreExpiration: true }); // Allow expired tokens
        // Check if the decoded payload contains the required data
        if (!decoded || typeof decoded !== "object" || !decoded.user_uuid) {
            throw new Error("Invalid token payload");
        }
        // Issue a new token with the same payload
        const newToken = jsonwebtoken_1.default.sign({ user_uuid: decoded.user_uuid }, SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ token: newToken });
    }
    catch (error) {
        console.error("Error refreshing token:", error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.refreshToken = refreshToken;
