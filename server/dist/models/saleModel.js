"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const saleSchema = new mongoose_1.default.Schema({
    worker: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Worker', required: true },
    saleItems: [{
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
            product: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product' }, // Optional
        }],
    totalAmount: { type: Number, required: true },
}, { timestamps: true });
const Sale = mongoose_1.default.model('Sale', saleSchema);
exports.default = Sale;
