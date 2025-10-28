const prisma = require('../prisma/prismaClient');

const getAllGauges = async () => {
  return await prisma.gauge.findMany();
}

const getGaugeById = async (id) => {
  return await prisma.gauge.findFirst({
    where: {
        id: Number(id),
    },
  });
}

const createGauge = async (data) => {
  return await prisma.gauge.create({ data });
}

const updateGauge = async (id, data) => {
  return await prisma.gauge.update({
    where: { id: Number(id) },
    data
  });
}

const deleteGauge = async (id) => {
  // Soft delete: set status to false
  return await prisma.gauge.update({
    where: { id: Number(id) },
    data: { status: false },
  });
}

module.exports = {
  getAllGauges,
  getGaugeById,
  createGauge,
  updateGauge,
  deleteGauge,
}