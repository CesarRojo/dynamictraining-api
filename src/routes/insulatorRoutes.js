const express = require('express');
const insulatorController = require('../controllers/insulatorController');

const router = express.Router();

router.get('/', insulatorController.getAllInsulators);
router.get('/:id', insulatorController.getInsulatorById);
router.post('/', insulatorController.createInsulator);
router.put('/:id', insulatorController.updateInsulator);
router.delete('/:id', insulatorController.deleteInsulator);

module.exports = router;