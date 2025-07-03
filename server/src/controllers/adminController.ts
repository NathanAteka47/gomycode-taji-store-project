import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const ADMIN_ID = '254254';
const ADMIN_PASSWORD = 'Taji';

export const adminLogin = (req: Request, res: Response) => {
  const { adminId, password } = req.body;

  if (adminId === ADMIN_ID && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    return res.status(200).json({ message: 'Login successful', token });
  }

  res.status(401).json({ message: 'Invalid admin credentials' });
};
