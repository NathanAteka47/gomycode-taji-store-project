import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  phone: String,
  amount: Number,
  merchantRequestID: String,
  checkoutRequestID: String,
  resultCode: Number,
  resultDesc: String,
  mpesaReceiptNumber: String,
  transactionDate: String,
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
