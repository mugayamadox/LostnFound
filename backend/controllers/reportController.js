const Item = require('../models/Item');

// Report Lost Item
const reportLostItem = async (req, res) => {
    try {
        const { name, description, contact, location } = req.body;

        // Create a new lost item record in MongoDB
        const newItem = new Item({
            name,
            description,
            contact,
            location,
            type: 'lost',
            userId: req.userId // Comes from JWT middleware
        });

        await newItem.save();

        res.status(201).json({ message: 'Lost item reported successfully', item: newItem });
    } catch (error) {
        res.status(500).json({ error: 'Failed to report lost item' });
    }
};

// Report Found Item
const reportFoundItem = async (req, res) => {
    try {
        const { name, description, contact, location } = req.body;

        // Create a new found item record in MongoDB
        const newItem = new Item({
            name,
            description,
            contact,
            location,
            type: 'found',
            userId: req.userId // Comes from JWT middleware
        });

        await newItem.save();

        res.status(201).json({ message: 'Found item reported successfully', item: newItem });
    } catch (error) {
        res.status(500).json({ error: 'Failed to report found item' });
    }
};

import Item from '../models/Item.js'; // Import your Item model

// Function to get all lost items
export const getLostItems = async (req, res) => {
    try {
        const lostItems = await Item.find({ type: 'lost' }); // Assuming 'type' indicates lost or found
        res.status(200).json(lostItems);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving lost items', error });
    }
};

// Function to get all found items
export const getFoundItems = async (req, res) => {
    try {
        const foundItems = await Item.find({ type: 'found' }); // Assuming 'type' indicates lost or found
        res.status(200).json(foundItems);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving found items', error });
    }
};




module.exports = { reportLostItem, reportFoundItem };