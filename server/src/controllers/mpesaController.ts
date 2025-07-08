import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import Payment from '../models/paymentModel'; // ✅ model to save payment data

dotenv.config();

const safBaseUrl = 'https://sandbox.safaricom.co.ke';

const getToken = async (): Promise<string> => {
  const { MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET } = process.env;

  if (!MPESA_CONSUMER_KEY || !MPESA_CONSUMER_SECRET) {
    throw new Error('M-Pesa credentials not set in environment');
  }

  const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');

  const { data } = await axios.get(`${safBaseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` },
  });

  return data.access_token;
};

// ✅ STK Push Simulation Route
export const simulateSTKPush = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = await getToken();
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

    const { data } = await axios.post(`${safBaseUrl}/mpesa/stkpush/v1/processrequest`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to simulate STK Push', details: error });
  }
};

// ✅ Callback Processor Route
export const mpesaCallback = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body.Body?.stkCallback;

    if (!data) {
      res.status(400).json({ error: 'Invalid callback structure' });
      return;
    }

    const {
      MerchantRequestID,
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata,
    } = data;

    let mpesaReceiptNumber = '';
    let transactionDate = '';
    let amount = 0;
    let phone = '';

    if (CallbackMetadata?.Item) {
      CallbackMetadata.Item.forEach((item: any) => {
        if (item.Name === 'MpesaReceiptNumber') mpesaReceiptNumber = item.Value;
        if (item.Name === 'TransactionDate') transactionDate = item.Value;
        if (item.Name === 'PhoneNumber') phone = item.Value;
        if (item.Name === 'Amount') amount = item.Value;
      });
    }

    await Payment.create({
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
  } catch (err) {
    console.error('❌ Callback Error:', err);
    res.status(500).json({ error: 'Failed to process callback' });
  }
};
