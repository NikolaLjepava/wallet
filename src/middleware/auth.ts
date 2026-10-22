import { Request, Response, NextFunction } from 'express';
import { config } from '../config/env';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'Authorization header required' });
  }

  if (token !== `Bearer ${config.apiToken}`) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  
  next();
};