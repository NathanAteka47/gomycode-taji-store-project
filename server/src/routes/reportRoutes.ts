import express from 'express';
import { exportSalesReport } from '../controllers/reportController';

const router = express.Router();

router.get('/export', exportSalesReport);

export default router;