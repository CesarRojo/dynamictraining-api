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
    // include: {
    //   completedSections: {
    //     include: {
    //       section: true,
    //     },
    //   },
    // },
    skip,
    take: pageSize,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return { players, totalCount };
};

const getPlayersClasification = async (filters = {}, page = 1, pageSize = 10) => {
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
      attempts: true,
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
  // Obtener fecha y hora del servidor
  const result = await prisma.$queryRaw`SELECT CAST(GETDATE() AS DATE) AS ServerDate`;
  const serverDate = result[0].ServerDate;

  const result2 = await prisma.$queryRaw`SELECT GETDATE() AS ServerDateTime`;
  const serverDate2 = result2[0].ServerDateTime;

  // Buscar jugador existente con el mismo clock en el mismo día
  const existingPlayer = await prisma.player.findFirst({
    where: {
      clock: data.clock,
      game: data.game,
      createdAt: {
        gte: new Date(serverDate),
        lt: new Date(new Date(serverDate).getTime() + 24 * 60 * 60 * 1000),
      },
    },
    include: {
      completedSections: {
        include: {
          section: true,
          attempt: true,
        },
      },
      attempts: true,
    },
  });

  if (existingPlayer) {
    // Crear un nuevo attempt para el jugador existente
    const newAttempt = await prisma.attempt.create({
      data: {
        playerId: existingPlayer.id,
      },
    });

    // Crear las completedSections asociadas a ese attempt
    const completedSectionsToCreate = data.completedSections.map(cs => ({
      sectionId: cs.sectionId,
      completedAt: serverDate2,
      correctCount: cs.correctCount,
      timeTaken: cs.timeTaken,
      playerId: existingPlayer.id,
      attemptId: newAttempt.id,
    }));

    await prisma.completedSection.createMany({
      data: completedSectionsToCreate,
    });

    // Refrescar y devolver el jugador actualizado con sus attempts y completedSections
    const updatedPlayer = await prisma.player.findUnique({
      where: { id: existingPlayer.id },
      include: {
        attempts: {
          include: {
            completedSections: {
              include: {
                section: true,
              },
            },
          },
        },
        completedSections: {
          include: {
            section: true,
            attempt: true,
          },
        },
      },
    });

    return updatedPlayer;
  } else {
    // Crear nuevo jugador
    const player = await prisma.player.create({
      data: {
        clock: data.clock,
        plant: data.plant,
        game: data.game,
        createdAt: serverDate2,
      },
    });

    // Crear attempt para el jugador nuevo
    const attempt = await prisma.attempt.create({
      data: {
        playerId: player.id,
      },
    });

    // Crear completedSections asociados al attempt y player
    const completedSectionsToCreate = data.completedSections.map(cs => ({
      sectionId: cs.sectionId,
      completedAt: serverDate2,
      correctCount: cs.correctCount,
      timeTaken: cs.timeTaken,
      playerId: player.id,
      attemptId: attempt.id,
    }));

    await prisma.completedSection.createMany({
      data: completedSectionsToCreate,
    });

    // Devolver jugador con relaciones
    const playerWithRelations = await prisma.player.findUnique({
      where: { id: player.id },
      include: {
        attempts: {
          include: {
            completedSections: {
              include: {
                section: true,
              },
            },
          },
        },
        completedSections: {
          include: {
            section: true,
            attempt: true,
          },
        },
      },
    });

    return playerWithRelations;
  }
};

module.exports = {
  createPlayerWithCompletedSections,
  getPlayersWithCompletedSections,
  getPlayerById,
  getPlayersClasification,
};