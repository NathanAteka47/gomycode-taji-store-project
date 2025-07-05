import { Request, Response } from 'express';
import Sale from '../models/saleModel';
import { sendReceiptEmail } from '../utils/email';

export const getAllSales = async (req: Request, res: Response) => {
  const sales = await Sale.find().populate('worker', 'name workerId');
  res.json(sales);
};

export const getSalesToday = async (req: Request, res: Response) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sales = await Sale.find({ createdAt: { $gte: today } });
  const total = sales.reduce((acc, sale) => acc + sale.totalAmount, 0);
  res.json({ count: sales.length, total });
};
export const createSale = async (req: Request, res: Response) => {
  try {
    const { sendEmail, customerEmail, saleItems, totalAmount } = req.body;

    // Save sale
    const sale = await Sale.create(req.body);

    // Send email if requested
    if (sendEmail && customerEmail) {
      const date = new Date().toLocaleString();
      const htmlReceipt = `
        <div style="font-family: monospace; line-height: 1.4;">
          <h2>TAJI EATS RESTAURANT</h2>
          <p>Authentic Traditional Cuisines<br/>
          Wilson Airport, Nairobi, Kenya<br/>
          TEL: +254 741 775 352<br/>
          EMAIL: orders@tajieats.co.ke<br/>
          PIN: P051234567A</p>

          <p>CASHIER: Jane Doe<br/>DATE: ${date}</p>
          <hr />
          <table width="100%" style="font-size: 14px;">
            <thead>
              <tr><th align="left">Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>
            </thead>
            <tbody>
              ${saleItems.map((item: any) =>
                `<tr>
                  <td>${item.name}</td>
                  <td align="center">${item.qty}</td>
                  <td align="right">Ksh ${item.price.toFixed(2)}</td>
                  <td align="right">Ksh ${(item.qty * item.price).toFixed(2)}</td>
                </tr>`
              ).join('')}
            </tbody>
          </table>
          <hr />
          <p><strong>Total: Ksh ${totalAmount.toFixed(2)}</strong></p>
          <p>Thank you for shopping at Taji!</p>
        </div>
      `;

      await sendReceiptEmail(customerEmail, 'Your Receipt from Taji Eats', htmlReceipt);
    }

    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ message: 'Error creating sale', error });
  }
};
