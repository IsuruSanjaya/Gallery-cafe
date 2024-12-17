const express = require('express');
const { getMenu, addMenu, deleteMenu, updateMenu } = require('../controllers/menuController');
const router = express.Router();

// Get all menu items
router.get('/', getMenu);

// Add a new menu item
router.post('/', addMenu);

// Delete a menu item by ID
router.delete('/:id', deleteMenu);

// Update a menu item by ID
router.put('/:id', updateMenu);

module.exports = router;
