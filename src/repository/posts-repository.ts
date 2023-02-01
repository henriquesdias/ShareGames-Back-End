import { prisma } from "../config/database-postgres";

async function findMany() {
  return prisma.posts.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      Users: {
        select: {
          id: true,
          username: true,
          picture: true,
          createdAt: true,
          deletedAt: true,
        },
      },
      Comments: {
        select: {
          id: true,
          description: true,
          createdAt: true,
          deletedAt: true,
          Users: {
            select: {
              id: true,
              username: true,
              picture: true,
            },
          },
        },
      },
    },
    where: {
      deletedAt: null,
    },
  });
}

async function create(userId: number, description: string) {
  return prisma.posts.create({
    data: {
      userId,
      description,
    },
  });
}

export const postsRepository = {
  findMany,
  create,
};
