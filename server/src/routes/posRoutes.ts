// Bluetooth printing support (POS printer integration is typically frontend/native app level, but we can simulate API endpoint)

import express from 'express';
import Order from '../models/orderModel';
import { exec } from 'child_process';

const router = express.Router();

// Simulate sending a receipt to a print handler (in real case, handled by frontend or native app)
router.post('/print-receipt/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const receiptText = `Receipt\nOrder ID: ${order._id}\nTotal: Ksh ${order.totalPrice}\nDate: ${order.createdAt}`;

    // Simulate printing (on Linux/macOS; on Windows replace with appropriate print command)
    exec(`echo "${receiptText}" > receipt.txt`, (error) => {
      if (error) {
        return res.status(500).json({ message: 'Printing failed', error });
      }
      res.status(200).json({ message: 'Receipt generated for printing' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Error printing receipt', error: err });
  }
});

// Export reports to Excel
import ExcelJS from 'exceljs';

router.get('/export/sales-report', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Sales Report');

    sheet.columns = [
      { header: 'Order ID', key: '_id', width: 30 },
      { header: 'Total Price', key: 'totalPrice', width: 15 },
      { header: 'Date', key: 'createdAt', width: 25 },
    ];

    orders.forEach((order) => sheet.addRow(order));

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="sales_report.xlsx"'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).json({ message: 'Failed to export report', error: err });
  }
});

// M-Pesa Integration - Simulated for now
router.post('/mpesa/stk-push', async (req, res) => {
  const { phone, amount } = req.body;

  // Simulate M-Pesa request payload
  const mpesaPayload = {
    BusinessShortCode: '123456',
    Password: 'base64encodedPassword',
    Timestamp: '20250701121500',
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phone,
    PartyB: '123456',
    PhoneNumber: phone,
    CallBackURL: 'https://your-backend.com/api/mpesa/callback',
    AccountReference: 'TajiStore',
    TransactionDesc: 'Taji POS Payment',
  };

  console.log('M-Pesa STK Request Payload', mpesaPayload);

  res.status(200).json({ message: 'Simulated M-Pesa STK Push initiated', mpesaPayload });
});

export default router;
