const prisma = require('../prisma/prismaClient');

const getAllResponses = async () => {
  return await prisma.response.findMany();
}

const createResponse = async (data) => {
  return await prisma.response.create({ data });
}

module.exports = {
  getAllResponses,
  createResponse,
}