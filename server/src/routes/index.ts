// backend/routes/index.ts
import express from 'express';
import userRoutes from './userRoutes';
import productRoutes from './productRoutes';
import workerRoutes from './workerRoutes';
import orderRoutes from './orderRoutes';
import saleRoutes from './saleRoutes';
import reservationRoutes from './reservationRoutes';
import adminRoutes from './adminRoutes';
import mpesaRoutes from './mpesaRoutes';
import inventoryRoutes from './inventoryRoutes';
import stockRoutes from './stockRoutes';
import transactionRoutes from './transactionRoutes';

const router = express.Router();

router.use('/api/users', userRoutes);
router.use('/api/products', productRoutes);
router.use('/api/workers', workerRoutes);
router.use('/api/orders', orderRoutes);
router.use('/api/sales', saleRoutes);
router.use('/api/reservations', reservationRoutes);
router.use('/api/admin', adminRoutes);
router.use('/api/mpesa', mpesaRoutes); // 🟢 For STK Push & callbacks
router.use('/api/inventory', inventoryRoutes); // 🟢 Smart inventory alerts
router.use('/api/stock', stockRoutes); // 🟢 Multi-location stock tracking
router.use('/api/transactions', transactionRoutes); // 🟢 Payment history

export default router;
