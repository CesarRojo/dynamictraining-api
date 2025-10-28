const prisma = require('../prisma/prismaClient');

const getAllData = async () => {
  return await prisma.data.findMany({
    include: {
      color: true,
      section: true,
    },
  });
}

const getDataById = async (id) => {
  return await prisma.data.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      color: true,
      section: true,
    },
  });
}

const getDataByPlant = async (plantName) => {
  if(plantName === "Super") return await prisma.data.findMany({ include: { color: true, section: true, } });

  const plant = await prisma.plant.findUnique({
    where: { name: plantName }
  });

  if (!plant) return [];

  return await prisma.data.findMany({
    where: {
      section: {
        plantId: plant.id
      }
    },
    include: {
      color: true,
      section: true,
    },
  });
};

const createData = async (data) => {
  return await prisma.data.create({
    data,
    include: {
      color: true,
      section: true,
    },
  });
}

const updateData = async (id, data) => {
  return await prisma.data.update({
    where: { id: Number(id) },
    data,
    include: {
      color: true,
      section: true,
    },
  });
}

const deleteData = async (id) => {
  // Soft delete: set status to false
  return await prisma.data.update({
    where: { id: Number(id) },
    data: { status: false },
  });
}

module.exports = {
  getAllData,
  getDataById,
  createData,
  updateData,
  deleteData,
  getDataByPlant,
}