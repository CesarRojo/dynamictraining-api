const prisma = require('../prisma/prismaClient');

const getAllInsulators = async () => {
  return await prisma.insulator.findMany();
}

const getInsulatorById = async (id) => {
  return await prisma.insulator.findFirst({
    where: {
        id: Number(id),
    },
  });
}

const createInsulator = async (data) => {
  return await prisma.insulator.create({ data });
}

const updateInsulator = async (id, data) => {
  return await prisma.insulator.update({
    where: { id: Number(id) },
    data
  });
}

const deleteInsulator = async (id) => {
  // Soft delete: set status to false
  return await prisma.insulator.update({
    where: { id: Number(id) },
    data: { status: false },
  });
}

module.exports = {
  getAllInsulators,
  getInsulatorById,
  createInsulator,
  updateInsulator,
  deleteInsulator,
}