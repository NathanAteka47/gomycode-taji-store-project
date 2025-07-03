// backend/server.ts

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';

// 🔁 Central route loader
import allRoutes from './routes';


dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// ✅ Load all routes from routes/index.ts
app.use(allRoutes);

// Test route
app.get('/api', (req: Request, res: Response) => {
  res.send('Taji Online Store API is running...');
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
