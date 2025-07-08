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
exports.mpesaCallback = exports.simulateSTKPush = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const paymentModel_1 = __importDefault(require("../models/paymentModel")); // ✅ model to save payment data
dotenv_1.default.config();
const safBaseUrl = 'https://sandbox.safaricom.co.ke';
const getToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const { MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET } = process.env;
    if (!MPESA_CONSUMER_KEY || !MPESA_CONSUMER_SECRET) {
        throw new Error('M-Pesa credentials not set in environment');
    }
    const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');
    const { data } = yield axios_1.default.get(`${safBaseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
        headers: { Authorization: `Basic ${auth}` },
    });
    return data.access_token;
});
// ✅ STK Push Simulation Route
const simulateSTKPush = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield getToken();
        const { phone, amount } = req.body;
        if (!phone || !amount) {
            res.status(400).json({ error: 'Phone and amount are required' });
            return;
        }
        const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
        const shortcode = process.env.MPESA_SHORTCODE || '';
        const passkey = process.env.MPESA_PASSKEY || '';
        const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
        const payload = {
            BusinessShortCode: shortcode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: 'CustomerPayBillOnline',
            Amount: amount,
            PartyA: phone,
            PartyB: shortcode,
            PhoneNumber: phone,
            CallBackURL: `${process.env.BASE_URL}/api/mpesa/callback`,
            AccountReference: 'TajiStoreOrder',
            TransactionDesc: 'Taji Order Payment',
        };
        const { data } = yield axios_1.default.post(`${safBaseUrl}/mpesa/stkpush/v1/processrequest`, payload, {
            headers: { Authorization: `Bearer ${token}` },
        });
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to simulate STK Push', details: error });
    }
});
exports.simulateSTKPush = simulateSTKPush;
// ✅ Callback Processor Route
const mpesaCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const data = (_a = req.body.Body) === null || _a === void 0 ? void 0 : _a.stkCallback;
        if (!data) {
            res.status(400).json({ error: 'Invalid callback structure' });
            return;
        }
        const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata, } = data;
        let mpesaReceiptNumber = '';
        let transactionDate = '';
        let amount = 0;
        let phone = '';
        if (CallbackMetadata === null || CallbackMetadata === void 0 ? void 0 : CallbackMetadata.Item) {
            CallbackMetadata.Item.forEach((item) => {
                if (item.Name === 'MpesaReceiptNumber')
                    mpesaReceiptNumber = item.Value;
                if (item.Name === 'TransactionDate')
                    transactionDate = item.Value;
                if (item.Name === 'PhoneNumber')
                    phone = item.Value;
                if (item.Name === 'Amount')
                    amount = item.Value;
            });
        }
        yield paymentModel_1.default.create({
            phone,
            amount,
            merchantRequestID: MerchantRequestID,
            checkoutRequestID: CheckoutRequestID,
            resultCode: ResultCode,
            resultDesc: ResultDesc,
            mpesaReceiptNumber,
            transactionDate,
        });
        console.log('✅ Payment saved to DB');
        res.status(200).json({ message: 'Payment logged successfully' });
    }
    catch (err) {
        console.error('❌ Callback Error:', err);
        res.status(500).json({ error: 'Failed to process callback' });
    }
});
exports.mpesaCallback = mpesaCallback;
