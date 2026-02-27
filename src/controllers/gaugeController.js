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
    // campos del gauge (vienen como strings en multipart)
    const gaugeData = {
      gauge: req.body.gauge,
      rings: req.body.rings,
      features: req.body.features,
      insulatorId: Number(req.body.insulatorId),
      sectionId: Number(req.body.sectionId),
      status: req.body.status !== undefined ? req.body.status === 'true' : true,
    };

    // si llega archivo, creamos image
    let imageData = null;
    if (req.file) {
      const url = `/uploads/${req.file.filename}`;

      imageData = {
        url,
        ownerType: req.body.ownerType ?? 'Gauge',
      };
    }

    const newGauge = await gaugeServices.createGaugeWithImage({ gaugeData, imageData });
    res.status(201).json(newGauge);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Gauge already exists' });
    }
    console.error('Error creating gauge:', error);
    res.status(500).json({ error: 'Error creating gauge' });
  }
};

const updateGauge = async (req, res) => {
  try {
    const { id } = req.params;

    const existingGauge = await gaugeServices.getGaugeById(id);
    if (!existingGauge) return res.status(404).json({ error: 'Gauge not found' });

    const gaugeData = {
      ...(req.body.gauge !== undefined ? { gauge: req.body.gauge } : {}),
      ...(req.body.rings !== undefined ? { rings: req.body.rings } : {}),
      ...(req.body.features !== undefined ? { features: req.body.features } : {}),
      ...(req.body.insulatorId !== undefined ? { insulatorId: Number(req.body.insulatorId) } : {}),
      ...(req.body.sectionId !== undefined ? { sectionId: Number(req.body.sectionId) } : {}),
      ...(req.body.status !== undefined ? { status: req.body.status === 'true' } : {}),
    };

    const updatedGauge = await gaugeServices.updateGaugeWithOptionalImage(id, {
      gaugeData,
      newFile: req.file || null, // <- multer
    });

    res.status(200).json(updatedGauge);
  } catch (error) {
    console.error('Error updating gauge:', error);
    res.status(500).json({ error: 'Error updating gauge' });
  }
};

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