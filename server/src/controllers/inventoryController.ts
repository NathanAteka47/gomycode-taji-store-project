import { Request, Response } from 'express';
import InventoryAlert from '../models/inventoryAlertModel';

export const checkInventoryLevels = async (req: Request, res: Response) => {
  try {
    const alerts = await InventoryAlert.find();
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inventory alerts' });
  }
};
