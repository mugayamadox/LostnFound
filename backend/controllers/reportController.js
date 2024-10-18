// Description: Controller for handling report related operations.
// import { connectPG, connectMB } from '../database/db.js';

// import { find, create, update, remove } from '../services/itemService';
// import { User } from '../models/User.js';
import { Item, Comment } from '../models/Item.js';
import { Geolocation } from '../models/Geolocation.js';
import { Report } from '../models/Report.js';

// Report Lost Item
const reportLostItem = async (req, res) => {
    try {
        const { name, description, location, comment } = req.body;
        
        // Create new report for lost items
        const newReport = new Report({
            userId: req.userId, // Comes from JWT middleware
            status: 'lost',
            geolocationId: newGeolocation._id, // TODO: Hardcoded for now
            title: name,
            description,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // Create new location record in MongoDB
        const newGeolocation = new Geolocation({ 
            reportId: newReport._id,
            latitude: location.latitude,
            longitude: location.longitude,
            address: location.address
        });

        // Iterate through items array and create new lost item records linked to report
        const items = req.body.items; // Assuming items array is passed in the request body
        const newItems = items.map(item => new Item({
            reportId: newReport._id,
            typeId: 'xyz789', // Hardcoded for now
            name: item.name,
            description: item.description,
            updatedAt: new Date()
        }));

        // Create new comment record in MongoDB
        const newComment = new Comment({
            reportId: newReport._id,
            userId: req.userId, // Comes from JWT middleware
            content: comment,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await newGeolocation.save();
        await newReport.save();
        await newComment.save();
        // Save all new items to the database
        for (const newItem of newItems) {
            await newItem.save();
        }

        res.status(201).json({ message: 'Lost item reported successfully', report: newReport });
    } catch (error) {
        res.status(500).json({ error: 'Failed to report lost item' });
    }
};

// Report Found Item
const reportFoundItem = async (req, res) => {
    try {
        const { name, description, contact, location } = req.body;

        // Create a new report for found items
        const newReport = new Report({
            userId: req.userId, // Comes from JWT middleware
            status: 'found',
            geolocationId: 'abc123', // Hardcoded for now
            title: name,
            description,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await newReport.save();

        // Create new location record in MongoDB
        const newGeolocation = new Geolocation({ 
            reportId: newReport._id,
            latitude: location.latitude,
            longitude: location.longitude,
            address: location.address
        });

        await newGeolocation.save();

        // Create a new found item record in MongoDB
        const newItem = new Item({
            reportId: newReport._id,
            typeId: 'xyz789', // Hardcoded for now
            name,
            description,
            updatedAt: new Date()
        });

        await newItem.save();

        res.status(201).json({ message: 'Found item reported successfully', report: newReport });
    } catch (error) {
        res.status(500).json({ error: 'Failed to report found item' });
    }
};

// Function to get all lost items
const getLostItems = async (req, res) => {
    try {
        const lostReports = await Report.find({ status: 'lost' }).populate('items');
        res.status(200).json(lostReports);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving lost items', error });
    }
};

// Function to get all found items
const getFoundItems = async (req, res) => {
    try {
        const foundReports = await Report.find({ status: 'found' }).populate('items');
        res.status(500).json(foundReports);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving found items', error });
    }
};

export { reportLostItem, reportFoundItem, getLostItems, getFoundItems };