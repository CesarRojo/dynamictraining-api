const express = require('express');
const grpController = require('../controllers/grpController');

const router = express.Router();

router.get('/', grpController.getAllGrps);
router.post('/', grpController.createGrp);

module.exports = router;