import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export interface AuthRequest extends Request {
  user?: any;
}

// ✅ Middleware to protect any logged-in user
export const protectUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// ✅ Middleware to restrict access to admin users
export const protectAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  await protectUser(req, res, async () => {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
  });
};
