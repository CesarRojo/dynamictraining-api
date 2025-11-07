const prisma = require('../prisma/prismaClient');

const getPlayersWithCompletedSections = async (filters = {}, page = 1, pageSize = 10) => {
  const where = {};

  if (filters.plant) {
    where.plant = { contains: filters.plant };
  }
  if (filters.game) {
    where.game = { contains: filters.game };
  }
  if (filters.clock) {
    where.clock = { contains: filters.clock };
  }
  if (filters.completedAt) {
    const date = new Date(filters.completedAt);
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);

    where.completedSections = {
      some: {
        completedAt: {
          gte: date,
          lt: nextDate,
        },
      },
    };
  }

  const skip = (page - 1) * pageSize;

  const totalCount = await prisma.player.count({ where });

  const players = await prisma.player.findMany({
    where,
    include: {
      completedSections: {
        include: {
          section: true,
        },
      },
    },
    skip,
    take: pageSize,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return { players, totalCount };
};

const getPlayerById = async (id) => {
  return await prisma.player.findUnique({
    where: { id },
    include: {
      completedSections: {
        include: {
          section: true,
        },
      },
    },
  });
}

const createPlayerWithCompletedSections = async (data) => {
  const result = await prisma.$queryRaw`SELECT GETDATE() AS ServerDateTime`;
  const serverDate = result[0].ServerDateTime;

  return await prisma.player.create({
    data: {
      clock: data.clock,
      plant: data.plant,
      game: data.game,
      createdAt: serverDate,
      completedSections: {
        create: data.completedSections.map(cs => ({
          section: {
            connect: { id: cs.sectionId }
          },
          completedAt: serverDate,
        })),
      },
    },
    include: {
      completedSections: {
        include: {
          section: true,
        },
      },
    },
  });
}

module.exports = {
  createPlayerWithCompletedSections,
  getPlayersWithCompletedSections,
  getPlayerById,
};