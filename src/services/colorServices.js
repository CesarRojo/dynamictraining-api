const prisma = require('../prisma/prismaClient');

const getAllColors = async () => {
    return await prisma.color.findMany();
}

const getColorById = async (id) => {
    return await prisma.color.findFirst({
        where: {
            id: Number(id),
            status: true
        }
    });
}

const createColor = async (data) => {
    return await prisma.color.create({
        data
    });
}

const updateColor = async (id, data) => {
    return await prisma.color.update({
        where: { id: Number(id) },
        data
    });
}

const deleteColor = async (id) => {
    // Soft delete: set status to false
    return await prisma.color.update({
        where: { id: Number(id) },
        data: { status: false }
    });
}

module.exports = {
    getAllColors,
    getColorById,
    createColor,
    updateColor,
    deleteColor,
}