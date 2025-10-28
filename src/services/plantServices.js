const prisma = require('../prisma/prismaClient');

const getAllPlants = async () => {
  return await prisma.plant.findMany();
}

const getPlantById = async (id) => {
  return await prisma.plant.findFirst({
    where: {
      id: Number(id),
    },
  });
}

const getPlantByName = async (name) => {
  if(name === "Super") return await prisma.plant.findMany();

  return await prisma.plant.findFirst({
    where: {
      name: name,
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
  getPlantByName,
}