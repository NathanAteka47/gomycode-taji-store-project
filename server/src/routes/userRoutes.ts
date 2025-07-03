import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';

const router = express.Router();

// Make sure registerUser and loginUser are **functions**
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
