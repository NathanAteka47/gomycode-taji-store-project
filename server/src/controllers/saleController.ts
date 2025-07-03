import { Request, Response } from 'express';
import Sale from '../models/saleModel';
import Worker from '../models/workerModel';

export const createSale = async (req: Request, res: Response) => {
  try {
    const sale = await Sale.create(req.body);
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ message: 'Error creating sale', error });
  }
};

export const getAllSales = async (req: Request, res: Response) => {
  const sales = await Sale.find().populate('worker', 'name workerId');
  res.json(sales);
};

export const getSalesToday = async (req: Request, res: Response) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sales = await Sale.find({ createdAt: { $gte: today } });
  const total = sales.reduce((acc, sale) => acc + sale.totalAmount, 0);
  res.json({ count: sales.length, total });
};
