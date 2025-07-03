import express from 'express';
import { createSale, getAllSales, getSalesToday } from '../controllers/saleController';

const router = express.Router();

router.post('/', createSale);
router.get('/', getAllSales);
router.get('/today', getSalesToday);

export default router;