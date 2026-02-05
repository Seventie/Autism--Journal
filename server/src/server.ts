// server/src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import memoryRoutes from './routes/memories';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // For base64 images
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/memories', memoryRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});