import cron from 'node-cron';
import Order from '../models/orderModel';
import Sale from '../models/saleModel';
import nodemailer from 'nodemailer';

const sendDailySalesReport = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const orders = await Order.find({ createdAt: { $gte: today, $lt: tomorrow } });
    const sales = await Sale.find({ createdAt: { $gte: today, $lt: tomorrow } });

    const orderTotal = orders.reduce((sum, o) => sum + o.totalPrice, 0);
    const saleTotal = sales.reduce((sum, s) => sum + s.totalAmount, 0);
    const combinedTotal = orderTotal + saleTotal;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    const message = `
      DAILY SALES REPORT - Taji Eats

      Online Orders: ${orders.length} (Ksh ${orderTotal})
      POS Sales: ${sales.length} (Ksh ${saleTotal})

      Total Revenue: Ksh ${combinedTotal}
    `;

    await transporter.sendMail({
      from: 'Taji Store <' + process.env.MAIL_USER + '>',
      to: 'marlin4off7@gmail.com',
      subject: 'Daily Sales Report - Taji Store',
      text: message
    });

    console.log('📩 Daily Sales Report Email Sent');
  } catch (err) {
    console.error('❌ Failed to send sales report:', err);
  }
};

cron.schedule('59 23 * * *', sendDailySalesReport); // Every day at 11:59 PM

export default sendDailySalesReport;