import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, enum: ['food', 'water', 'cakes'] },
    inStock: { type: Boolean, default: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;