"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const saleController_1 = require("../controllers/saleController");
const router = express_1.default.Router();
router.post('/', saleController_1.createSale);
router.get('/', saleController_1.getAllSales);
router.get('/today', saleController_1.getSalesToday);
exports.default = router;
