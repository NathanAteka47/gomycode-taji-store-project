"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const analyticsController_1 = require("../controllers/analyticsController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/sales', authMiddleware_1.protectAdmin, analyticsController_1.getSalesInsights);
router.get('/top-products', authMiddleware_1.protectAdmin, analyticsController_1.getTopProducts);
exports.default = router;
