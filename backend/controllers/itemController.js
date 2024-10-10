import Item from '../models/Item.js'; // Import your Item model

// Function to filter items based on query parameters
export const getFilteredItems = async (req, res) => {
    try {
        const { type, location, name } = req.query; // Extract query parameters

        // Build the filter object based on provided criteria
        const filter = {};
        if (type) filter.type = type; // e.g., 'lost' or 'found'
        if (location) filter.location = { $regex: location, $options: 'i' }; // Case-insensitive regex match
        if (name) filter.name = { $regex: name, $options: 'i' }; // Case-insensitive regex match

        const items = await Item.find(filter); // Fetch filtered items
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving filtered items', error });
    }
};
