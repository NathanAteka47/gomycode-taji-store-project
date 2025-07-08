"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const workerSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    workerId: { type: String, required: true, unique: true },
    jobTitle: { type: String, required: true },
    picture: { type: String, default: 'default-avatar.png' },
}, { timestamps: true });
const Worker = mongoose_1.default.model('Worker', workerSchema);
exports.default = Worker;
