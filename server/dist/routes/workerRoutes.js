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
const express_1 = __importDefault(require("express"));
const workerController_1 = require("../controllers/workerController");
const workerModel_1 = __importDefault(require("../models/workerModel")); // ✅ Add this line
const router = express_1.default.Router();
// Create
router.post('/', workerController_1.createWorker);
// Read all
router.get('/', workerController_1.getAllWorkers);
// Read one
router.get('/:id', workerController_1.getWorkerById);
// ✅ Special route to get only worker name by ID
router.get('/:id/name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const worker = yield workerModel_1.default.findById(req.params.id);
        if (!worker) {
            res.status(404).json({ message: 'Worker not found' });
            return;
        }
        res.json({ name: worker.name });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
}));
// Update
router.put('/:id', workerController_1.updateWorker);
// Delete
router.delete('/:id', workerController_1.deleteWorker);
exports.default = router;
