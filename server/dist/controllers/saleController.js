"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSale = exports.getSalesToday = exports.getAllSales = void 0;
const saleModel_1 = __importDefault(require("../models/saleModel"));
const email_1 = require("../utils/email");
const getAllSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sales = yield saleModel_1.default.find().populate('worker', 'name workerId');
    res.json(sales);
});
exports.getAllSales = getAllSales;
const getSalesToday = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sales = yield saleModel_1.default.find({ createdAt: { $gte: today } });
    const total = sales.reduce((acc, sale) => acc + sale.totalAmount, 0);
    res.json({ count: sales.length, total });
});
exports.getSalesToday = getSalesToday;
const createSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sendEmail, customerEmail, saleItems, totalAmount } = req.body;
        // Save sale
        const sale = yield saleModel_1.default.create(req.body);
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
              ${saleItems.map((item) => `<tr>
                  <td>${item.name}</td>
                  <td align="center">${item.qty}</td>
                  <td align="right">Ksh ${item.price.toFixed(2)}</td>
                  <td align="right">Ksh ${(item.qty * item.price).toFixed(2)}</td>
                </tr>`).join('')}
            </tbody>
          </table>
          <hr />
          <p><strong>Total: Ksh ${totalAmount.toFixed(2)}</strong></p>
          <p>Thank you for shopping at Taji!</p>
        </div>
      `;
            yield (0, email_1.sendReceiptEmail)(customerEmail, 'Your Receipt from Taji Eats', htmlReceipt);
        }
        res.status(201).json(sale);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating sale', error });
    }
});
exports.createSale = createSale;
