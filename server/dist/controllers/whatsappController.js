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
exports.sendWhatsAppFile = exports.sendWhatsAppText = void 0;
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const sendWhatsAppText = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message, phone } = req.body;
        const response = yield axios_1.default.post(`https://api.ultramsg.com/instance${process.env.ULTRAMSG_INSTANCE_ID}/messages/chat`, {
            token: process.env.ULTRAMSG_TOKEN,
            to: phone,
            body: message,
        });
        res.status(200).json({ sent: true, data: response.data });
    }
    catch (err) {
        console.error('❌ WhatsApp Text Send Failed:', err);
        res.status(500).json({ message: 'Failed to send text to WhatsApp' });
    }
});
exports.sendWhatsAppText = sendWhatsAppText;
const sendWhatsAppFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone, caption } = req.body;
        const file = req.file;
        if (!file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }
        const form = new form_data_1.default();
        form.append('token', process.env.ULTRAMSG_TOKEN || '');
        form.append('to', phone);
        form.append('caption', caption);
        form.append('filename', file.originalname);
        form.append('document', file.buffer, {
            filename: file.originalname,
            contentType: file.mimetype,
        });
        const response = yield axios_1.default.post(`https://api.ultramsg.com/instance${process.env.ULTRAMSG_INSTANCE_ID}/messages/document`, form, {
            headers: form.getHeaders(),
        });
        res.status(200).json({ sent: true, data: response.data });
    }
    catch (err) {
        console.error('❌ WhatsApp File Send Failed:', err);
        res.status(500).json({ message: 'Failed to send file to WhatsApp' });
    }
});
exports.sendWhatsAppFile = sendWhatsAppFile;
