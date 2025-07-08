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
exports.getUnpaidOrders = exports.recordPayment = void 0;
const orderModel_1 = __importDefault(require("../models/orderModel"));
const recordPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, method } = req.body;
    try {
        const order = yield orderModel_1.default.findById(orderId);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentMethod = method;
        yield order.save();
        res.json({ message: 'Payment recorded successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Payment recording failed', error });
    }
});
exports.recordPayment = recordPayment;
const getUnpaidOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unpaid = yield orderModel_1.default.find({ isPaid: false });
        res.json(unpaid);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch unpaid orders', error });
    }
});
exports.getUnpaidOrders = getUnpaidOrders;
