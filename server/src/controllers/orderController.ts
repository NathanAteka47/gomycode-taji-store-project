import { Request, Response } from 'express';
import Order from '../models/orderModel';
import User from '../models/userModel';
import nodemailer from 'nodemailer';
import sendReceiptEmail from '../utils/sendReceiptEmail';
import jwt from 'jsonwebtoken';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { orderItems, shippingInfo, totalPrice, sendEmail, user } = req.body;

    if (!user || !orderItems || !shippingInfo || !shippingInfo.email || !totalPrice) {
      return res.status(400).json({ message: 'Missing required order fields' });
    }

    // Get user from JWT token if available
    let userId;
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      userId = decoded.id;
    }

    // Save order to DB
    const newOrder = await Order.create({
      user,
      orderItems,
      shippingInfo,
      totalPrice,
    });

    // Retrieve user if available
    const foundUser = await User.findById(user);

      // ✅ Format order details
const orderSummary = (orderItems as { name: string; qty: number; price: number }[])
  .map((item) => `• ${item.name} x ${item.qty} @ Ksh ${item.price}`)
  .join('\n');

    // Email to admin
    await transporter.sendMail({
      from: `Taji Orders <${process.env.EMAIL_USER}>`,
      to: 'marlin4off7@gmail.com',
      subject: `🛒 New Order from ${shippingInfo.fullName || user?.name || 'Unknown'}`,
      text: `You received a new order:\n\n${orderSummary}\n\nTotal: Ksh ${totalPrice}`,
    });

    // Email to user
    if (sendEmail && shippingInfo.email) {
      await sendReceiptEmail({
        to: shippingInfo.email,
        order: newOrder,
      });
    }

    res.status(201).json(newOrder);
  } catch (error: any) {
    console.error('❌ Order creation error:', error.message);
    res.status(400).json({ message: 'Error creating order', error: error.message });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await Order.find().populate('user', 'name phoneNumber');
  res.json(orders);
};

console.log('✅ EMAIL_USER:', process.env.EMAIL_USER);
console.log('✅ EMAIL_PASS:', process.env.EMAIL_PASS ? 'Loaded ✅' : 'Missing ❌');
