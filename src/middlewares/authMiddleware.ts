import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY ?? '';
interface JwtPayload {
  user_uuid: string;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); 
  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return ;
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    req.body.user_uuid = decoded.user_uuid; 
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
