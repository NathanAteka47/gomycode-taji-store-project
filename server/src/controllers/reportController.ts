import { Request, Response } from 'express';
import ExcelJS from 'exceljs';
import Order from '../models/orderModel';

export const exportSalesReport = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().lean();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sales Report');

    worksheet.columns = [
      { header: 'Date', key: 'date', width: 20 },
      { header: 'Customer', key: 'customer', width: 25 },
      { header: 'Total Price', key: 'totalPrice', width: 15 },
      { header: 'Items', key: 'items', width: 50 },
    ];

    orders.forEach(order => {
      worksheet.addRow({
        date: new Date(order.createdAt).toLocaleString(),
        customer: order.user?.name || 'Guest',
        totalPrice: order.totalPrice,
        items: order.orderItems.map(item => `${item.name} x${item.qty}`).join(', '),
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=sales-report.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error('Export error:', err);
    res.status(500).json({ message: 'Failed to export report' });
  }
};