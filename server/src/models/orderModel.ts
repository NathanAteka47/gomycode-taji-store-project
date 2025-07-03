import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
    }],
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false }, // To be updated by payment gateway
    status: { type: String, default: 'Pending', enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] }
}, { timestamps: true });

// Create the model from the schema and export it
const Order = mongoose.model('Order', orderSchema);

export default Order;