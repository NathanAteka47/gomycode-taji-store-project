import PDFDocument from 'pdfkit';
import { Response } from 'express';

export const generateReceiptPDF = (res: Response, order: any) => {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  doc.pipe(res);

  doc.fontSize(20).text('Taji Store Receipt', { align: 'center' });
  doc.moveDown();

  order.items.forEach((item: any) => {
    doc.text(`${item.name} x ${item.qty} = Ksh ${item.price * item.qty}`);
  });
  doc.moveDown();
  doc.fontSize(14).text(`Total: Ksh ${order.totalPrice}`);
  doc.end();
};
