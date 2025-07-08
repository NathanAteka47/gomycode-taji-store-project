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
exports.sendReceiptEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    auth: {
        user: 'marlin4off7@gmail.com', // Replace with your email
        pass: 'Mal12345', // Use App Password if using Gmail
    },
});
const sendReceiptEmail = (to, subject, htmlContent) => __awaiter(void 0, void 0, void 0, function* () {
    yield transporter.sendMail({
        from: '"Taji Eats" <tajieats@tajithreeinone.com>',
        to,
        subject,
        html: htmlContent,
    });
});
exports.sendReceiptEmail = sendReceiptEmail;
