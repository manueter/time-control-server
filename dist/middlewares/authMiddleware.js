"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Secret key to sign JWT tokens
const SECRET_KEY = process.env.S_KEY ?? '1c25f308d122ec5f438673a2479f163932c038bc7b0288ee21f50a347f78cd0d';
// Middleware to check if the request has a valid JWT
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from the Authorization header
    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.body.user_uuid = decoded.user_uuid; // Attach user UUID to request body
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
};
exports.authenticateToken = authenticateToken;
