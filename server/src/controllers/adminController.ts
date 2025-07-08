import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const ADMIN_ID = '254254';
const ADMIN_PASSWORD = 'Taji';

export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  const { adminId, password } = req.body;

  if (adminId === ADMIN_ID && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    res.status(200).json({ message: 'Login successful', token });
    return;
  }

  res.status(401).json({ message: 'Invalid admin credentials' });
};
