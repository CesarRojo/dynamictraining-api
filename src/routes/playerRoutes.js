const express = require('express');
const playerController = require('../controllers/playerController');

const router = express.Router();

router.get('/', playerController.getPlayers);
router.get('/:id', playerController.getPlayer);
router.post('/', playerController.createPlayer);

module.exports = router;