import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { pwdConfirm, pwdHasher } from '../utils/bcrypt';
import { AuthRequest } from '../middleware/authMiddleware';

// 🔐 Utility to generate JWT token
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
};

// ✅ @desc    Register a new user
// ✅ @route   POST /api/users/register
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, phoneNumber, password } = req.body;

  try {
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const user = new User({
      name,
      phoneNumber,
      password, // Let the pre-save hook hash the password
    });

    await user.save();

    const token = generateToken(user._id.toString());

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

// ✅ @desc    Authenticate user & return token
// ✅ @route   POST /api/users/login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { phoneNumber, password } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    const isMatch = await pwdConfirm(password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

// ✅ @desc    Update user password
// ✅ @route   PUT /api/users/:id/password
export const updateUserPassword = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const hashedPassword = pwdHasher(password);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ @desc    Update user profile
// ✅ @route   PUT /api/users/:id
export const updateUserProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, phoneNumber } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, phoneNumber },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile', error });
  }
};

// POST /api/users/reset-password
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { phoneNumber, newPassword } = req.body;
  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    user.password = newPassword; // Let pre-save hook hash it
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
