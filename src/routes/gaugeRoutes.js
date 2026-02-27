const express = require('express');
const gaugeController = require('../controllers/gaugeController');
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/', gaugeController.getAllGauges);
router.get('/:id', gaugeController.getGaugeById);
router.post('/', upload.single('image'), gaugeController.createGauge);
router.put('/:id', upload.single('image'), gaugeController.updateGauge);
router.delete('/:id', gaugeController.deleteGauge);

module.exports = router;