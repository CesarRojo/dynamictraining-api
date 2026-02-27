const prisma = require('../prisma/prismaClient');

const getAllGrps = async () => {
  return await prisma.gRP.findMany();
}

const createGrp = async (data) => {
  return await prisma.gRP.create({ data });
}

module.exports = {
  getAllGrps,
  createGrp,
}
