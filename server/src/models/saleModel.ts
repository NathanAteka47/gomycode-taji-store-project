import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  worker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true },
  saleItems: [{
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Optional
  }],
  totalAmount: { type: Number, required: true },
}, { timestamps: true });

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;