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
exports.getAllOrders = exports.createOrder = void 0;
const orderModel_1 = __importDefault(require("../models/orderModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendReceiptEmail_1 = __importDefault(require("../utils/sendReceiptEmail"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderItems, shippingInfo, totalPrice, sendEmail, user } = req.body;
        if (!user || !orderItems || !shippingInfo || !shippingInfo.email || !totalPrice) {
            res.status(400).json({ message: 'Missing required order fields' });
            return;
        }
        // Get user from JWT token if available
        let userId;
        const authHeader = req.headers.authorization;
        if (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            userId = decoded.id;
        }
        // Save order to DB
        const newOrder = yield orderModel_1.default.create({
            user,
            orderItems,
            shippingInfo,
            totalPrice,
        });
        // Retrieve user if available
        const foundUser = yield userModel_1.default.findById(user);
        // ✅ Format order details
        const orderSummary = orderItems
            .map((item) => `• ${item.name} x ${item.qty} @ Ksh ${item.price}`)
            .join('\n');
        // Email to admin
        yield transporter.sendMail({
            from: `Taji Orders <${process.env.EMAIL_USER}>`,
            to: 'marlin4off7@gmail.com',
            subject: `🛒 New Order from ${shippingInfo.fullName || (user === null || user === void 0 ? void 0 : user.name) || 'Unknown'}`,
            text: `You received a new order:\n\n${orderSummary}\n\nTotal: Ksh ${totalPrice}`,
        });
        // Email to user
        if (sendEmail && shippingInfo.email) {
            yield (0, sendReceiptEmail_1.default)({
                to: shippingInfo.email,
                order: newOrder,
            });
        }
        res.status(201).json(newOrder);
    }
    catch (error) {
        res.status(500).json({ message: 'Order creation failed', error });
    }
});
exports.createOrder = createOrder;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderModel_1.default.find().populate('user', 'name phoneNumber');
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve orders', error });
    }
});
exports.getAllOrders = getAllOrders;
console.log('✅ EMAIL_USER:', process.env.EMAIL_USER);
console.log('✅ EMAIL_PASS:', process.env.EMAIL_PASS ? 'Loaded ✅' : 'Missing ❌');
