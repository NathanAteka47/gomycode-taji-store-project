import express from 'express';
import {
  createWorker,
  getAllWorkers,
  getWorkerById,
  updateWorker,
  deleteWorker,
} from '../controllers/workerController';
import Worker from '../models/workerModel'; // ✅ Add this line

const router = express.Router();

// Create
router.post('/', createWorker);

// Read all
router.get('/', getAllWorkers);

// Read one
router.get('/:id', getWorkerById);

// ✅ Special route to get only worker name by ID
router.get('/:id/name', async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) return res.status(404).json({ message: 'Worker not found' });
    res.json({ name: worker.name });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Update
router.put('/:id', updateWorker);

// Delete
router.delete('/:id', deleteWorker);

export default router;
