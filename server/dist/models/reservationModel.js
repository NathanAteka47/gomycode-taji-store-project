"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reservationSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    review: { type: String },
    rating: { type: Number, min: 1, max: 5, required: true },
}, { timestamps: true });
// Create the model from the schema and export it
const Reservation = mongoose_1.default.model('Reservation', reservationSchema);
exports.default = Reservation;
