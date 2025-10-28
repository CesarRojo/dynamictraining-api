const gaugeServices = require('../services/gaugeServices');

const getAllGauges = async (req, res) => {
    try {
        const gauges = await gaugeServices.getAllGauges();
        res.status(200).json(gauges);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching gauges'});
    }
}

const getGaugeById = async (req, res) => {
    try {
        const { id } = req.params;
        const gauge = await gaugeServices.getGaugeById(id);
        if (!gauge) {
            return res.status(404).json({ error: 'Gauge not found' });
        }
        res.status(200).json(gauge);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching gauge by id' });
    }
}

const createGauge = async (req, res) => {
    try {
        const newGauge = await gaugeServices.createGauge(req.body);
        res.status(201).json(newGauge);
    } catch (error) {
      if (error.code === 'P2002') {
          return res.status(500).json({ error: 'Error creating gauge', message: 'Gauge already exists' });
      }
        res.status(500).json({ error: 'Error creating gauge' });
    }
}

const updateGauge = async (req, res) => {
    try {
        const { id } = req.params;
        const existingGauge = await gaugeServices.getGaugeById(id);
        if (!existingGauge) {
            return res.status(404).json({ error: 'Gauge not found' });
        }
        const updatedGauge = await gaugeServices.updateGauge(id, req.body);
        res.status(200).json(updatedGauge);
    } catch (error) {
        res.status(500).json({ error: 'Error updating gauge' });
    }
}

const deleteGauge = async (req, res) => {
    try {
        const { id } = req.params;
        const existingGauge = await gaugeServices.getGaugeById(id);
        if (!existingGauge) {
            return res.status(404).json({ error: 'Gauge not found' });
        }
        await gaugeServices.deleteGauge(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting gauge' });
    }
}

module.exports = {
  getAllGauges,
  getGaugeById,
  createGauge,
  updateGauge,
  deleteGauge,
}