import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import parseRoutes from './routes/parse.routes';
import exportRoutes from './routes/export.routes';
import dashboardRoutes from './routes/dashboard.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Health Check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'SmartCash AI Backend' });
});

// API Routes (preserves POST /parse & POST /export as requested)
app.use('/', parseRoutes);
app.use('/', exportRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;