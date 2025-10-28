const express = require('express');
const plantController = require('../controllers/plantController');

const router = express.Router();

router.get('/', plantController.getAllPlants);
router.get('/name', plantController.getPlantByName);
router.get('/:id', plantController.getPlantById);
router.post('/', plantController.createPlant);
router.put('/:id', plantController.updatePlant);
router.delete('/:id', plantController.deletePlant);

module.exports = router;