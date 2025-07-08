import { Request, Response } from 'express';
import StockAlert from '../models/stockAlertModel';

export const getStockAlerts = async (req: Request, res: Response) => {
  try {
    const alerts = await StockAlert.find();
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stock alerts' });
  }
};
