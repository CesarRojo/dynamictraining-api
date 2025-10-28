const express = require('express');
const dataController = require('../controllers/dataController');

const router = express.Router();

router.get('/', dataController.getAllData);
router.get('/plant', dataController.getDataByPlant);
router.get('/:id', dataController.getDataById);
router.post('/', dataController.createData);
router.put('/:id', dataController.updateData);
router.delete('/:id', dataController.deleteData);

module.exports = router;