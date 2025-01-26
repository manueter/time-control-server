import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Secret key to sign JWT tokens
const SECRET_KEY = process.env.S_KEY ?? '1c25f308d122ec5f438673a2479f163932c038bc7b0288ee21f50a347f78cd0d';
interface JwtPayload {
  user_uuid: string;
}

// Middleware to check if the request has a valid JWT
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from the Authorization header

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return ;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    req.body.user_uuid = decoded.user_uuid; // Attach user UUID to request body
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
