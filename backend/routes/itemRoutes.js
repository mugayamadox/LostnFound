const express = require('express');
import express from 'express';
import { getLostItems, getFoundItems } from '../controllers/itemController.js';

const itemRoutes = express.Router();

// Import item controller and auth middleware
const itemController = require('../controllers/itemController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes for reporting lost and found items
itemRoutes.post('/lost', authMiddleware, itemController.reportLostItem);
itemRoutes.post('/found', authMiddleware, itemController.reportFoundItem);

// Route to get all lost items
itemRoutes.get('/lost', getLostItems);

// Route to get all found items
itemRoutes.get('/found', getFoundItems);

// Route to filter items
itemRoutes.get('/', getFilteredItems);

export default itemRoutes;



// Route for getting all items
module.exports = itemRoutes;
