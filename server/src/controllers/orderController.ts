import { Request, Response } from 'express';
import Order from '../models/orderModel';
import User from '../models/userModel';
import nodemailer from 'nodemailer';

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.create(req.body);

    // Send email notification
    const user = await User.findById(order.user);
    const orderDetails = order.orderItems.map(i => `- ${i.name} x ${i.qty} @ Ksh ${i.price}`).join('\n');

    await transporter.sendMail({
      from: `Taji Orders <${process.env.EMAIL_USER}>`,
      to: 'marlin4off7@gmail.com',
      subject: `🛒 New Order Received from ${user?.name}`,
      text: `You received a new order:\n\n${orderDetails}\n\nTotal: Ksh ${order.totalPrice}`,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await Order.find().populate('user', 'name phoneNumber');
  res.json(orders);
};
