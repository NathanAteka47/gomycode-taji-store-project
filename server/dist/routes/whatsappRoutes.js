"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const whatsappController_1 = require("../controllers/whatsappController");
const router = express_1.default.Router();
const upload = (0, multer_1.default)(); // memory storage
router.post('/text', whatsappController_1.sendWhatsAppText);
router.post('/send', upload.single('file'), whatsappController_1.sendWhatsAppFile);
exports.default = router;
