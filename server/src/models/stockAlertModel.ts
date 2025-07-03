import mongoose from 'mongoose';

const stockAlertSchema = new mongoose.Schema({
  location: String,
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  stockLeft: Number,
  status: { type: String, enum: ['low', 'out'], default: 'low' },
}, { timestamps: true });

export default mongoose.model('StockAlert', stockAlertSchema);