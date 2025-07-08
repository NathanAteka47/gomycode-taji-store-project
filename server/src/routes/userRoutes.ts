import express, { Request, Response, NextFunction } from 'express';
import {
  registerUser,
  loginUser,
  updateUserPassword,
  updateUserProfile
} from '../controllers/userController';
import { protectUser } from '../middleware/authMiddleware';

const router = express.Router();

// Public
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected
router.put('/:id', protectUser as any, updateUserProfile);
router.put('/:id/password', protectUser as any, updateUserPassword);

export default router;
