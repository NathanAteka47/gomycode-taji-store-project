import express from 'express';
import { getStockAlerts } from '../controllers/stockController';
const router = express.Router();
router.get('/', getStockAlerts);
export default router;