import { Request, Response } from 'express';
import Order from '../models/orderModel';
import Product from '../models/productModel';

export const getSalesInsights = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

    res.json({ totalRevenue, totalOrders, averageOrderValue });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sales insights', error });
  }
};

export const getTopProducts = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    const productCounts: Record<string, number> = {};

    orders.forEach(order => {
      order.orderItems.forEach(item => {
        productCounts[item._id] = (productCounts[item._id] || 0) + item.qty;
      });
    });

    const sortedProductIds = Object.entries(productCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id]) => id);

    const topProducts = await Product.find({ _id: { $in: sortedProductIds } });
    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch top products', error });
  }
};