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
exports.getAllReservations = exports.createReservation = void 0;
const reservationModel_1 = __importDefault(require("../models/reservationModel"));
const createReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservation = yield reservationModel_1.default.create(req.body);
        res.status(201).json({ message: 'Reservation submitted successfully', reservation });
    }
    catch (error) {
        res.status(400).json({ message: 'Error submitting reservation', error });
    }
});
exports.createReservation = createReservation;
const getAllReservations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservations = yield reservationModel_1.default.find();
        res.json(reservations);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching reservations', error });
    }
});
exports.getAllReservations = getAllReservations;
