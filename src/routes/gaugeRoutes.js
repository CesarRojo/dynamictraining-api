const express = require('express');
const gaugeController = require('../controllers/gaugeController');

const router = express.Router();

router.get('/', gaugeController.getAllGauges);
router.get('/:id', gaugeController.getGaugeById);
router.post('/', gaugeController.createGauge);
router.put('/:id', gaugeController.updateGauge);
router.delete('/:id', gaugeController.deleteGauge);

module.exports = router;