const playerService = require('../services/playerServices');

const getPlayers = async (req, res) => {
  try {
    const { plant, game, clock, completedAt, page = 1, pageSize = 10 } = req.query;

    const filters = { plant, game, clock, completedAt };

    // Convert page and pageSize to numbers
    const pageNum = parseInt(page, 10) || 1;
    const pageSizeNum = parseInt(pageSize, 10) || 10;

    const { players, totalCount } = await playerService.getPlayersWithCompletedSections(filters, pageNum, pageSizeNum);

    res.json({ players, totalCount, page: pageNum, pageSize: pageSizeNum });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching players' });
  }
};

const getPlayer = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid player id' });

    const player = await playerService.getPlayerById(id);
    if (!player) return res.status(404).json({ message: 'Player not found' });

    res.json(player);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching player by id' });
  }
}

const createPlayer = async (req, res) => {
  try {
    const { clock, plant, game, completedSections } = req.body;

    if (!clock || !plant || !game || !Array.isArray(completedSections)) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const player = await playerService.createPlayerWithCompletedSections({
      clock,
      plant,
      game,
      completedSections,
    });

    res.status(201).json(player);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating player' });
  }
}

module.exports = {
    getPlayers,
    getPlayer,
    createPlayer,
};