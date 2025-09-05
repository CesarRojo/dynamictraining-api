const express = require('express');
const colorController = require('../controllers/colorController');

const router = express.Router();

//Define routes
router.get('/', colorController.getAllColors);

// Get color by ID
router.get('/:id', colorController.getColorById);

// Create new color
router.post('/', colorController.createColor);

// Update color by ID
router.put('/:id', colorController.updateColor);

// Soft delete color by ID
router.delete('/:id', colorController.deleteColor);

module.exports = router;