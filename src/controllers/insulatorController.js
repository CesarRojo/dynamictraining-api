const insulatorService = require('../services/insulatorServices');

const getAllInsulators = async (req, res) => {
    try {
        const insulators = await insulatorService.getAllInsulators();
        res.status(200).json(insulators);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching insulators'});
    }
}

const getInsulatorById = async (req, res) => {
    try {
        const { id } = req.params;
        const insulator = await insulatorService.getInsulatorById(id);
        if (!insulator) {
            return res.status(404).json({ error: 'Insulator not found' });
        }
        res.status(200).json(insulator);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching insulator by id' });
    }
}

const createInsulator = async (req, res) => {
    try {
        const newInsulator = await insulatorService.createInsulator(req.body);
        res.status(201).json(newInsulator);
    } catch (error) {
      if (error.code === 'P2002') {
          return res.status(500).json({ error: 'Error creating insulator', message: 'Insulator already exists' });
      }
      res.status(500).json({ error: 'Error creating section' });
    }
}

const updateInsulator = async (req, res) => {
    try {
        const { id } = req.params;
        const existingInsulator = await insulatorService.getInsulatorById(id);
        if (!existingInsulator) {
            return res.status(404).json({ error: 'Insulator not found' });
        }

        const updatedInsulator = await insulatorService.updateInsulator(id, req.body);
        res.status(200).json(updatedInsulator);
    } catch (error) {
        res.status(500).json({ error: 'Error updating insulator' });
    }
}

const deleteInsulator = async (req, res) => {
    try {
        const { id } = req.params;
        const existingInsulator = await insulatorService.getInsulatorById(id);
        if (!existingInsulator) {
            return res.status(404).json({ error: 'Insulator not found' });
        }
        
        await insulatorService.deleteInsulator(id);
        res.status(200).json({ message: 'Insulator deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting insulator' });
    }
}

module.exports = {
    getAllInsulators,
    getInsulatorById,
    createInsulator,
    updateInsulator,
    deleteInsulator,
}