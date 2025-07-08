import { Request, Response } from 'express';
import Order from '../models/orderModel';

export const recordPayment = async (req: Request, res: Response): Promise<void> => {
  const { orderId, method } = req.body;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentMethod = method;
    await order.save();
    res.json({ message: 'Payment recorded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Payment recording failed', error });
  }
};

export const getUnpaidOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const unpaid = await Order.find({ isPaid: false });
    res.json(unpaid);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch unpaid orders', error });
  }
};
