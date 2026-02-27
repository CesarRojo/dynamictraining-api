const gameServices = require('../services/gameServices');

const getAllGames = async (req, res) => {
    try {
        const games = await gameServices.getAllGames();
        res.json(games);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createGame = async (req, res) => {
    try {
        const game = await gameServices.createGame(req.body);
        res.status(201).json(game);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllGames,
    createGame,
}