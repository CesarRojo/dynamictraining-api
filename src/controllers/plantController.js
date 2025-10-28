const plantServices = require('../services/plantServices');
const sectionServices = require('../services/sectionServices');

const getAllPlants = async (req, res) => {
  try {
    const plants = await plantServices.getAllPlants();
    res.status(200).json(plants);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching plants' });
  }
}

const getPlantById = async (req, res) => {
  try {
    const { id } = req.params;
    const plant = await plantServices.getPlantById(id);
    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.status(200).json(plant);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching plant' });
  }
}

const getPlantByName = async (req, res) => {
  try {
    const { name } = req.query;
    const plant = await plantServices.getPlantByName(name);
    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.status(200).json(plant);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching plant by name' });
  }
}

const createPlant = async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      return res.status(400).json({ error: 'Name and code are required' });
    }

    const newPlant = await plantServices.createPlant({ name, code });
    res.status(201).json(newPlant);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(500).json({ error: 'Error creating plant', message: 'Plant name or code already exists' });
    }
    res.status(500).json({ error: 'Error creating plant' });
  }
}

const updatePlant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, status } = req.body;

    const existingPlant = await plantServices.getPlantById(id);
    if (!existingPlant) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    const updatedPlant = await plantServices.updatePlant(id, { name, code, status });
    res.status(200).json(updatedPlant);
  } catch (error) {
    res.status(500).json({ error: 'Error updating plant' });
  }
}

const deletePlant = async (req, res) => {
  try {
    const { id } = req.params;

    const existingPlant = await plantServices.getPlantById(id);
    if (!existingPlant) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    await plantServices.deletePlant(id);
    res.status(200).json({ message: 'Plant deactivated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting plant' });
  }
}

module.exports = {
  getAllPlants,
  getPlantById,
  createPlant,
  updatePlant,
  deletePlant,
  getPlantByName,
}