"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const unpaidSchema = new mongoose_1.default.Schema({
    orderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Order' },
    amount: Number,
    reason: String,
    customer: String,
    dueDate: Date,
}, { timestamps: true });
exports.default = mongoose_1.default.model('Unpaid', unpaidSchema);
