const Menu = require('../models/Menu');

exports.getMenu = async (req, res) => {
    try {
        const menu = await Menu.find();
        res.status(200).json(menu);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addMenu = async (req, res) => {
    const { name, type, description, price, image } = req.body;
    try {
        const menu = new Menu({ name, type, description, price, image });
        await menu.save();
        res.status(201).json({ message: 'Menu item added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete menu item by ID
exports.deleteMenu = async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
    try {
        const menu = await Menu.findByIdAndDelete(id); // Find and delete the item by ID

        if (!menu) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update menu item by ID
exports.updateMenu = async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
    const { name, type, description, price, image } = req.body; // Get the updated fields from the request body

    try {
        const menu = await Menu.findByIdAndUpdate(
            id,
            { name, type, description, price, image }, // Update fields
            { new: true } // Return the updated document
        );

        if (!menu) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        res.status(200).json({ message: 'Menu item updated successfully', menu });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
