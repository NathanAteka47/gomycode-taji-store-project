"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const paymentSchema = new mongoose_1.default.Schema({
    phone: String,
    amount: Number,
    merchantRequestID: String,
    checkoutRequestID: String,
    resultCode: Number,
    resultDesc: String,
    mpesaReceiptNumber: String,
    transactionDate: String,
}, { timestamps: true });
const Payment = mongoose_1.default.model('Payment', paymentSchema);
exports.default = Payment;
