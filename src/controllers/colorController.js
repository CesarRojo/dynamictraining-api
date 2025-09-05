const colorServices = require('../services/colorServices');

const getAllColors = async (req, res) => {
    try {
        const colors = await colorServices.getAllColors();
        res.status(200).json(colors);
    } catch (error) {
        res.status(500).json({ error: '<<Error fetching colors>>' });
    }
}

const getColorById = async (req, res) => {
    try {
        const { id } = req.params;
        const color = await colorServices.getColorById(id);
        if (!color) {
            return res.status(404).json({ error: 'Color not found' });
        }
        res.status(200).json(color);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching color' });
    }
}

const createColor = async (req, res) => {
    try {
        const { color, display } = req.body;
        if (!color || !display) {
            return res.status(400).json({ error: 'Color and display are required' });
        }
        const newColor = await colorServices.createColor({ color, display });
        res.status(201).json(newColor);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(500).json({ error: 'Error creating color', message: 'Color already exists' });
        }
        res.status(500).json({ error: 'Error creating color' });
    }
}

const updateColor = async (req, res) => {
    try {
        const { id } = req.params;
        const { color, display, status } = req.body;

        // Check if color exists
        const existingColor = await colorServices.getColorById(id);
        if (!existingColor) {
            return res.status(404).json({ error: 'Color not found' });
        }

        const updatedColor = await colorServices.updateColor(id, { color, display, status });
        res.status(200).json(updatedColor);
    } catch (error) {
        res.status(500).json({ error: 'Error updating color' });
    }
}

const deleteColor = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if color exists
        const existingColor = await colorServices.getColorById(id);
        if (!existingColor) {
            return res.status(404).json({ error: 'Color not found' });
        }

        await colorServices.deleteColor(id);
        res.status(200).json({ message: 'Color deactivated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting color' });
    }
}

module.exports = {
    getAllColors,
    getColorById,
    createColor,
    updateColor,
    deleteColor,
}