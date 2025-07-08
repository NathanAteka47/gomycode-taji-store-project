import { Request, Response } from 'express';

export const adminLogin = (req: Request, res: Response) => {
  const { adminId, password } = req.body;
  if (adminId === '254254' && password === 'Taji') {
    return res.status(200).json({ message: 'Login successful' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
};
