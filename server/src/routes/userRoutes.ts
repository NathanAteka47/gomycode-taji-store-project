import express, { Request, Response, NextFunction } from 'express';
import {
  registerUser,
  loginUser,
  updateUserPassword,
  updateUserProfile,
  resetPassword
} from '../controllers/userController';
import { protectUser } from '../middleware/authMiddleware';
import bcrypt from "bcryptjs";
import User from "../models/userModel";

const router = express.Router();

// Public
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected
router.put('/:id', protectUser as any, updateUserProfile);
router.put('/:id/password', protectUser as any, updateUserPassword);

router.post('/reset-password', resetPassword);


export default router;
