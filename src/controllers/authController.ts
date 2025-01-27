import { Request, Response } from 'express';
import { comparePassword } from '../utils/hashUtils';
import { getUsers } from '../models/userModel';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY ?? ''

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

    if (!validateInput(email, username, password)) {
      res.status(400).json({ message: 'Email/username and password are required.' });
      return;
    }

    const usersData = await getUsers();
    const user = findUser(usersData, email, username);

    if (!user) {
      res.status(400).json({ message: 'Invalid email/username or password.' });
      return;
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid email/username or password.' });
      return;
    }

    const token = jwt.sign({ user_uuid: user.uuid }, SECRET_KEY, { expiresIn: '1h' });

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

export const logoutUser = (_req: Request, res: Response): void => {
  res.status(200).json({ message: 'User logged out successfully.' });
};


export const refreshToken = (req: Request, res: Response): void => {
  const { token } = req.body;

  if (!token) {
    res.status(401).json({ message: "Token is required" });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY, { ignoreExpiration: true }); 
    if (!decoded || typeof decoded !== "object" || !decoded.user_uuid) {
      throw new Error("Invalid token payload");
    }
    const newToken = jwt.sign({ user_uuid: decoded.user_uuid }, SECRET_KEY, { expiresIn: "1h" });
    res.status(200).json({ token: newToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};