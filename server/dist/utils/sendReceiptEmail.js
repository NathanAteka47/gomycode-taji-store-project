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
exports.default = sendReceiptEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
function sendReceiptEmail(_a) {
    return __awaiter(this, arguments, void 0, function* ({ to, order }) {
        const items = order.orderItems
            .map((item) => `<li>${item.name} x ${item.qty} @ Ksh ${item.price}</li>`)
            .join('');
        const htmlContent = `
    <h2>Thank you for your order!</h2>
    <p>Order ID: <strong>${order._id}</strong></p>
    <p><strong>Total:</strong> Ksh ${order.totalPrice}</p>
    <ul>${items}</ul>
    <p><strong>Shipping to:</strong> ${order.shippingInfo.fullName}, ${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.phone}</p>
  `;
        yield transporter.sendMail({
            from: `Taji Store <${process.env.EMAIL_USER}>`,
            to,
            subject: '🧾 Your Taji Store Receipt',
            html: htmlContent,
        });
    });
}
