import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    review: { type: String },
    rating: { type: Number, min: 1, max: 5, required: true },
}, { timestamps: true });

// Create the model from the schema and export it
const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;