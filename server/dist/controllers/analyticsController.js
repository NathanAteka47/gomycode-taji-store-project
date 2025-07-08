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
exports.getTopProducts = exports.getSalesInsights = void 0;
const orderModel_1 = __importDefault(require("../models/orderModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
const getSalesInsights = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderModel_1.default.find();
        const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
        const totalOrders = orders.length;
        const averageOrderValue = totalOrders ? totalRevenue / totalOrders : 0;
        res.json({ totalRevenue, totalOrders, averageOrderValue });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch sales insights', error });
    }
});
exports.getSalesInsights = getSalesInsights;
const getTopProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderModel_1.default.find();
        const productCounts = {};
        orders.forEach(order => {
            order.orderItems.forEach(item => {
                const key = item._id.toString();
                productCounts[key] = (productCounts[key] || 0) + item.qty;
            });
        });
        const sortedProductIds = Object.entries(productCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([id]) => id);
        const topProducts = yield productModel_1.default.find({ _id: { $in: sortedProductIds } });
        res.json(topProducts);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch top products', error });
    }
});
exports.getTopProducts = getTopProducts;
