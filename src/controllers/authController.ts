import { Request, Response } from 'express';
import { comparePassword } from '../utils/hashUtils';
import { getUsers } from '../models/userModel';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY ??  '' // Use a more secure key in production

// Function to validate input data
const validateInput = (email?: string, username?: string, password?: string): boolean => {
  return !!(email ?? username) && !!password;
};

const findUser = (users: any[], email?: string, username?: string) => {
  if (email) {
    return users.find((u) => u.email === email);
  } else if (username) {
    return users.find((u) => u.username === username);
  }
  return null;
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, username, password } = req.body;

  try {
    // Validate input data
    if (!validateInput(email, username, password)) {
      res.status(400).json({ message: 'Email/username and password are required.' });
      return;
    }

    // Get users
    const usersData = await getUsers();
    const user = findUser(usersData, email, username);

    // Check if the user exists
    if (!user) {
      res.status(400).json({ message: 'Invalid email/username or password.' });
      return;
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid email/username or password.' });
      return;
    }

    // Generate a JWT token
    const token = jwt.sign({ user_uuid: user.uuid }, SECRET_KEY, { expiresIn: '1h' });

    // Send the response with the token
    res.status(200).json({
      message: 'Login successful!',
      token,
      user_uuid: user.uuid,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An error occurred during login.' });
  }
};

// Logout user (Client-side)
export const logoutUser = (req: Request, res: Response): void => {
  // JWT-based authentication doesn't require server-side logout logic
  res.status(200).json({ message: 'User logged out successfully.' });
};


export const refreshToken = (req: Request, res: Response): void => {
  const { token } = req.body;

  if (!token) {
    res.status(401).json({ message: "Token is required" });
    return;
  }

  try {
    // Verify the expired token
    const decoded = jwt.verify(token, SECRET_KEY, { ignoreExpiration: true }); // Allow expired tokens

    // Check if the decoded payload contains the required data
    if (!decoded || typeof decoded !== "object" || !decoded.user_uuid) {
      throw new Error("Invalid token payload");
    }

    // Issue a new token with the same payload
    const newToken = jwt.sign({ user_uuid: decoded.user_uuid }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ token: newToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};