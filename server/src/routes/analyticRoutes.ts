import express from 'express';
import { getSalesInsights, getTopProducts } from '../controllers/analyticsController';
import { protectAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/sales', protectAdmin, getSalesInsights);
router.get('/top-products', protectAdmin, getTopProducts);

export default router;
