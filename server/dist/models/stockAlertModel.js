"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const stockAlertSchema = new mongoose_1.default.Schema({
    location: String,
    productId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product' },
    stockLeft: Number,
    status: { type: String, enum: ['low', 'out'], default: 'low' },
}, { timestamps: true });
exports.default = mongoose_1.default.model('StockAlert', stockAlertSchema);
