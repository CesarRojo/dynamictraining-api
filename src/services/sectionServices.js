const prisma = require('../prisma/prismaClient');

const getAllSections = async () => {
  return await prisma.section.findMany();
}

const getSectionById = async (id) => {
  return await prisma.section.findFirst({
    where: {
      id: Number(id),
    }
  });
}

const getSectionByPlant = async (plant) => {
  if(plant === "Super") return await prisma.section.findMany();

  return await prisma.section.findMany({
    where: {
      plant: {
        name: plant
      }
    }
  });
}

const createSection = async (data) => {
  return await prisma.section.create({
    data
  });
}

const updateSection = async (id, data) => {
  return await prisma.section.update({
    where: { id: Number(id) },
    data
  });
}

const deleteSection = async (id) => {
  // Soft delete: set status to false
  return await prisma.section.update({
    where: { id: Number(id) },
    data: { status: false }
  });
}

module.exports = {
  getAllSections,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
  getSectionByPlant,
}