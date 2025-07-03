import { Request, Response } from 'express';
import Worker from '../models/workerModel';

export const createWorker = async (req: Request, res: Response) => {
  try {
    const worker = await Worker.create(req.body);
    res.status(201).json(worker);
  } catch (error) {
    res.status(400).json({ message: 'Error creating worker', error });
  }
};

export const getAllWorkers = async (req: Request, res: Response) => {
  const workers = await Worker.find();
  res.json(workers);
};

export const getWorkerById = async (req: Request, res: Response) => {
  const worker = await Worker.findById(req.params.id);
  if (!worker) return res.status(404).json({ message: 'Worker not found' });
  res.json(worker);
};

export const updateWorker = async (req: Request, res: Response) => {
  try {
    const updated = await Worker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating worker', error });
  }
};

export const deleteWorker = async (req: Request, res: Response) => {
  try {
    await Worker.findByIdAndDelete(req.params.id);
    res.json({ message: 'Worker deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting worker', error });
  }
};
