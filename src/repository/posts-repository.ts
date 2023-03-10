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

async function findUnique(postId: number) {
  return prisma.posts.findFirst({
    where: {
      id: postId,
    },
  });
}

export const postsRepository = {
  findMany,
  create,
  findUnique,
};
