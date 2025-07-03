import mongoose from 'mongoose';

const unpaidSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  amount: Number,
  reason: String,
  customer: String,
  dueDate: Date,
}, { timestamps: true });

export default mongoose.model('Unpaid', unpaidSchema);