"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWorker = exports.updateWorker = exports.getWorkerById = exports.getAllWorkers = exports.createWorker = void 0;
const workerModel_1 = __importDefault(require("../models/workerModel"));
const createWorker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const worker = yield workerModel_1.default.create(req.body);
        res.status(201).json(worker);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating worker', error });
    }
});
exports.createWorker = createWorker;
const getAllWorkers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workers = yield workerModel_1.default.find();
    res.json(workers);
});
exports.getAllWorkers = getAllWorkers;
const getWorkerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const worker = yield workerModel_1.default.findById(req.params.id);
    if (!worker) {
        res.status(404).json({ message: 'Worker not found' });
        return;
    }
    res.json(worker);
});
exports.getWorkerById = getWorkerById;
const updateWorker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield workerModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating worker', error });
    }
});
exports.updateWorker = updateWorker;
const deleteWorker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield workerModel_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'Worker deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ message: 'Error deleting worker', error });
    }
});
exports.deleteWorker = deleteWorker;
