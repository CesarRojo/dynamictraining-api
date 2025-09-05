const prisma = require('../prisma/prismaClient');

const getAllPlants = async () => {
  return await prisma.plant.findMany({
    where: { status: true },
    include: {
      section: true, // Include related section info if needed
    },
  });
}

const getPlantById = async (id) => {
  return await prisma.plant.findFirst({
    where: {
      id: Number(id),
      status: true,
    },
    include: {
      section: true,
    },
  });
}

const createPlant = async (data) => {
  return await prisma.plant.create({ data });
}

const updatePlant = async (id, data) => {
  return await prisma.plant.update({
    where: { id: Number(id) },
    data
  });
}

const deletePlant = async (id) => {
  // Soft delete: set status to false
  return await prisma.plant.update({
    where: { id: Number(id) },
    data: { status: false },
  });
}

module.exports = {
  getAllPlants,
  getPlantById,
  createPlant,
  updatePlant,
  deletePlant,
}