import { Request, Response } from 'express';
import Reservation from '../models/reservationModel';

export const createReservation = async (req: Request, res: Response) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.status(201).json({ message: 'Reservation submitted successfully', reservation });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting reservation', error });
  }
};

export const getAllReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations', error });
  }
};
