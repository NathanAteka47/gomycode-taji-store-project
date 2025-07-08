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
const node_cron_1 = __importDefault(require("node-cron"));
const orderModel_1 = __importDefault(require("../models/orderModel"));
const saleModel_1 = __importDefault(require("../models/saleModel"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendDailySalesReport = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const orders = yield orderModel_1.default.find({ createdAt: { $gte: today, $lt: tomorrow } });
        const sales = yield saleModel_1.default.find({ createdAt: { $gte: today, $lt: tomorrow } });
        const orderTotal = orders.reduce((sum, o) => sum + o.totalPrice, 0);
        const saleTotal = sales.reduce((sum, s) => sum + s.totalAmount, 0);
        const combinedTotal = orderTotal + saleTotal;
        const transporter = nodemailer_1.default.createTransport({
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
        yield transporter.sendMail({
            from: 'Taji Store <' + process.env.MAIL_USER + '>',
            to: 'marlin4off7@gmail.com',
            subject: 'Daily Sales Report - Taji Store',
            text: message
        });
        console.log('📩 Daily Sales Report Email Sent');
    }
    catch (err) {
        console.error('❌ Failed to send sales report:', err);
    }
});
node_cron_1.default.schedule('59 23 * * *', sendDailySalesReport); // Every day at 11:59 PM
exports.default = sendDailySalesReport;
