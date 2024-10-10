// server.js
require('dotenv').config();
import express, { json } from 'express';
import { connect } from 'mongoose';
import { Sequelize } from 'sequelize';

// Express App Setup
const app = express();
app.use(json()); // Middleware for JSON parsing

// MongoDB Connection
connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection error:', err));

// PostgreSQL Connection
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
    dialect: 'postgres',
});

sequelize.authenticate()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.log('PostgreSQL connection error:', err));

// Basic Route
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// Listen on defined PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Import and Use Routes

import reportRoutes from './routes/reportRoutes.js';
app.use('/api/reports', reportRoutes);

import itemRoutes from './routes/itemRoutes.js';
// Use item routes for lost/found reporting
app.use('/api/items', itemRoutes);
