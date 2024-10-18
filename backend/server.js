import reportRoutes from './routes/reportRoutes.js';

import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import express, { json } from 'express';
import { connectMD, connectPG } from './database/db.js';

// Express App Setup
const app = express();
app.use(json()); // Middleware for JSON parsing

// Connect to the MongoDB and PostgresDB databases
connectMD();
connectPG();

// Basic Route
app.get('/', (_req, res) => {
    res.send('Backend is running');
});

// Listen on defined PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Routing to the Report Functions
app.use('/v1/reports', reportRoutes);
