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
exports.exportSalesReport = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const orderModel_1 = __importDefault(require("../models/orderModel"));
const exportSalesReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderModel_1.default.find().populate('user').lean();
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet('Sales Report');
        worksheet.columns = [
            { header: 'Date', key: 'date', width: 20 },
            { header: 'Customer', key: 'customer', width: 25 },
            { header: 'Total Price', key: 'totalPrice', width: 15 },
            { header: 'Items', key: 'items', width: 50 },
        ];
        orders.forEach(order => {
            worksheet.addRow({
                date: new Date(order.createdAt).toLocaleString(),
                customer: typeof order.user === 'object' && 'name' in order.user ? order.user.name : 'Guest',
                totalPrice: order.totalPrice,
                items: order.orderItems.map(item => `${item.name} x${item.qty}`).join(', '),
            });
        });
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=sales-report.xlsx');
        yield workbook.xlsx.write(res);
        res.end();
    }
    catch (err) {
        console.error('Export error:', err);
        res.status(500).json({ message: 'Failed to export report' });
    }
});
exports.exportSalesReport = exportSalesReport;
