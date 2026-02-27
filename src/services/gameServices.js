const prisma = require('../prisma/prismaClient');

const getAllGames = async () => {
  return await prisma.game.findMany();
}

const createGame = async (data) => {
  return await prisma.game.create({ data });
}

module.exports = {
  getAllGames,
  createGame,
}
