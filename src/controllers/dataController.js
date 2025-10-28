const dataServices = require('../services/dataServices');

const getAllData = async (req, res) => {
  try {
    const data = await dataServices.getAllData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
}

const getDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await dataServices.getDataById(id);
    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
}

const getDataByPlant = async (req, res) => {
  try {
    const { plant } = req.query;
    const data = await dataServices.getDataByPlant(plant);
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data by plant' });
  }
}

const createData = async (req, res) => {
  try {
    const { value, colorId, sectionId } = req.body;

    if (!value || !colorId || !sectionId) {
      return res.status(400).json({ error: 'Value, colorId and sectionId are required' });
    }

    const newData = await dataServices.createData({ value, colorId, sectionId });
    res.status(201).json(newData);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(500).json({ error: 'Error creating data', message: 'Data value already exists' });
    }
    res.status(500).json({ error: 'Error creating data' });
  }
}

const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { value, colorId, sectionId, status } = req.body;

    const existingData = await dataServices.getDataById(id);
    if (!existingData) {
      return res.status(404).json({ error: 'Data not found' });
    }

    const updatedData = await dataServices.updateData(id, { value, colorId, sectionId, status });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: 'Error updating data' });
  }
}

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;

    const existingData = await dataServices.getDataById(id);
    if (!existingData) {
      return res.status(404).json({ error: 'Data not found' });
    }

    await dataServices.deleteData(id);
    res.status(200).json({ message: 'Data deactivated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting data' });
  }
}

module.exports = {
  getAllData,
  getDataById,
  createData,
  updateData,
  deleteData,
  getDataByPlant,
}