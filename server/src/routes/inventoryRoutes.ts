import express from 'express';
import { checkInventoryLevels } from '../controllers/inventoryController';
const router = express.Router();
router.get('/', checkInventoryLevels);
export default router;