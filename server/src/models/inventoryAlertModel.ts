import mongoose from 'mongoose';

const inventoryAlertSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  threshold: { type: Number, required: true },
  currentStock: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('InventoryAlert', inventoryAlertSchema);