const express = require('express');
const responseController = require('../controllers/responseController');

const router = express.Router();

router.get('/', responseController.getAllResponses);
router.post('/', responseController.createResponse);

module.exports = router;