import express from 'express';
import { simulateSTKPush, mpesaCallback } from '../controllers/mpesaController';

const router = express.Router();

// Route to simulate STK push (client initiates payment)
router.post('/stkpush', simulateSTKPush);

// Callback URL that Safaricom would hit with the transaction result
router.post('/callback', mpesaCallback);

export default router;
