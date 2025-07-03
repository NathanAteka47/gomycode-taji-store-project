import express from 'express';
import { recordPayment, getUnpaidOrders } from '../controllers/paymentController';
import { protectAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/record', protectAdmin, recordPayment);
router.get('/unpaid', protectAdmin, getUnpaidOrders);

export default router;
