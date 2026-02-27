const fs = require('fs');
const path = require('path');
const prisma = require('../prisma/prismaClient');

const deleteFileIfExists = (filePath) => {
  try {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch (_) {}
};

const getAllGauges = async () => {
  return await prisma.gauge.findMany({
    include: {
      response: true,
    }
  });
}

const getGaugeById = async (id) => {
  return await prisma.gauge.findFirst({
    where: {
        id: Number(id),
    },
  });
}

// const createGauge = async (data) => {
//   return await prisma.gauge.create({ data });
// }

const createGaugeWithImage = async ({ gaugeData, imageData }) => {
  return prisma.$transaction(async (tx) => {
    let image = null;

    if (imageData) {
      image = await tx.response.create({ data: imageData });
    }

    const createdGauge = await tx.gauge.create({
      data: {
        ...gaugeData,
        imageId: image ? image.id : null,
      },
    });

    return createdGauge;
  });
};

// const updateGauge = async (id, data) => {
//   return await prisma.gauge.update({
//     where: { id: Number(id) },
//     data
//   });
// }

const updateGaugeWithOptionalImage = async (id, { gaugeData, newFile }) => {
  return prisma.$transaction(async (tx) => {
    const gauge = await tx.gauge.findUnique({
      where: { id: Number(id) },
      include: { image: true },
    });

    if (!gauge) return null;

    let imageIdToUse = gauge.imageId ?? null;

    // Si viene archivo nuevo, actualizar imagen existente (DB) y borrar archivo anterior
    if (newFile) {
      const newUrl = `/uploads/${newFile.filename}`;

      if (gauge.image) {
        // borrar archivo anterior del disco
        const oldUrl = gauge.image.url; // ej: /uploads/xxx.jpg
        const oldFilePath = path.join(process.cwd(), oldUrl.replace(/^\//, ''));
        deleteFileIfExists(oldFilePath);

        // actualizar registro existente
        await tx.response.update({
          where: { id: gauge.image.id },
          data: { url: newUrl },
        });

        imageIdToUse = gauge.image.id;
      } else {
        // no había imagen: crear y asociar
        const created = await tx.response.create({
          data: { url: newUrl, ownerType: 'Gauge' },
        });
        imageIdToUse = created.id;
      }
    }

    const updatedGauge = await tx.gauge.update({
      where: { id: Number(id) },
      data: {
        ...gaugeData,
        imageId: imageIdToUse,
      },
    });

    return updatedGauge;
  });
};

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
  // createGauge,
  createGaugeWithImage,
  // updateGauge,
  updateGaugeWithOptionalImage,
  deleteGauge,
}