"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/routes/index.ts
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const productRoutes_1 = __importDefault(require("./productRoutes"));
const workerRoutes_1 = __importDefault(require("./workerRoutes"));
const orderRoutes_1 = __importDefault(require("./orderRoutes"));
const saleRoutes_1 = __importDefault(require("./saleRoutes"));
const reservationRoutes_1 = __importDefault(require("./reservationRoutes"));
const adminRoutes_1 = __importDefault(require("./adminRoutes"));
const mpesaRoutes_1 = __importDefault(require("./mpesaRoutes"));
const inventoryRoutes_1 = __importDefault(require("./inventoryRoutes"));
const stockRoutes_1 = __importDefault(require("./stockRoutes"));
const transactionRoutes_1 = __importDefault(require("./transactionRoutes"));
const router = express_1.default.Router();
router.use('/api/users', userRoutes_1.default);
router.use('/api/products', productRoutes_1.default);
router.use('/api/workers', workerRoutes_1.default);
router.use('/api/orders', orderRoutes_1.default);
router.use('/api/sales', saleRoutes_1.default);
router.use('/api/reservations', reservationRoutes_1.default);
router.use('/api/admin', adminRoutes_1.default);
router.use('/api/mpesa', mpesaRoutes_1.default); // 🟢 For STK Push & callbacks
router.use('/api/inventory', inventoryRoutes_1.default); // 🟢 Smart inventory alerts
router.use('/api/stock', stockRoutes_1.default); // 🟢 Multi-location stock tracking
router.use('/api/transactions', transactionRoutes_1.default); // 🟢 Payment history
exports.default = router;
