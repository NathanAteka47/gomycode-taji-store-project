import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    workerId: { type: String, required: true, unique: true },
    jobTitle: { type: String, required: true },
    picture: { type: String, default: 'default-avatar.png' },
}, { timestamps: true });

const Worker = mongoose.model('Worker', workerSchema);

export default Worker;