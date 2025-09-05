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
      status: true,
    },
    include: {
      color: true,
      section: true,
    },
  });
}

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
}