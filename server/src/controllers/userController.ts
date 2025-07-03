import { RequestHandler, type Request,type Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

// 🔐 Utility to generate JWT token
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
};

// ✅ @desc    Register a new user
// ✅ @route   POST /api/users/register
export const registerUser:RequestHandler<any> = async (req, res) => {
  const { name, phoneNumber, password } = req.body;
  const hashedPassword=bcrypt.hashSync(password)
  try {
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 🧠 Let Mongoose hash the password with pre('save') middleware
    const user = new User({ name, phoneNumber, password:hashedPassword });
    await user.save();

    const token = generateToken(user._id.toString());

    res.status(201).json({
      _id: user._id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (err: any) {
    console.error('Registration Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ @desc    Authenticate user & return token
// ✅ @route   POST /api/users/login
export const loginUser:RequestHandler = async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({
      _id: user._id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (err: any) {
    console.error('Login Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
