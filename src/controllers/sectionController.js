const sectionServices = require('../services/sectionServices');

const getAllSections = async (req, res) => {
  try {
    const sections = await sectionServices.getAllSections();
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching sections' });
  }
}

const getSectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const section = await sectionServices.getSectionById(id);
    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }
    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching section' });
  }
}

const createSection = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const newSection = await sectionServices.createSection({ name });
    res.status(201).json(newSection);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(500).json({ error: 'Error creating section', message: 'Section already exists' });
    }
    res.status(500).json({ error: 'Error creating section' });
  }
}

const updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    const existingSection = await sectionServices.getSectionById(id);
    if (!existingSection) {
      return res.status(404).json({ error: 'Section not found' });
    }

    const updatedSection = await sectionServices.updateSection(id, { name, status });
    res.status(200).json(updatedSection);
  } catch (error) {
    res.status(500).json({ error: 'Error updating section' });
  }
}

const deleteSection = async (req, res) => {
  try {
    const { id } = req.params;

    const existingSection = await sectionServices.getSectionById(id);
    if (!existingSection) {
      return res.status(404).json({ error: 'Section not found' });
    }

    await sectionServices.deleteSection(id);
    res.status(200).json({ message: 'Section deactivated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting section' });
  }
}

module.exports = {
  getAllSections,
  getSectionById,
  createSection,
  updateSection,
  deleteSection
}