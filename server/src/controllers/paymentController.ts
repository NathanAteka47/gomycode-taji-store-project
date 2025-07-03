import { Request, Response } from 'express';
import Order from '../models/orderModel';

export const recordPayment = async (req: Request, res: Response) => {
  const { orderId, method } = req.body;
  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentMethod = method;
    await order.save();
    res.json({ message: 'Payment recorded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Payment recording failed', error });
  }
};

export const getUnpaidOrders = async (req: Request, res: Response) => {
  try {
    const unpaid = await Order.find({ isPaid: false });
    res.json(unpaid);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch unpaid orders', error });
  }
};
