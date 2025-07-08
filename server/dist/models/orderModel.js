"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
            product: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product' }
        }],
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false }, // To be updated by payment gateway
    paidAt: { type: Date },
    paymentMethod: { type: String },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] }
}, { timestamps: true });
// Create the model from the schema and export it
const Order = mongoose_1.default.model('Order', orderSchema);
exports.default = Order;
