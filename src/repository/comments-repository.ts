import { prisma } from "../config/database-postgres";
import { newComment } from "../protocols";

async function create({ postId, userId, description }: newComment) {
  return prisma.comments.create({
    data: {
      userId,
      postId,
      description,
    },
  });
}

async function findMany(postId: number) {
  return prisma.comments.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      postId,
      deletedAt: null,
    },
    include: {
      Users: {
        select: {
          id: true,
          picture: true,
          username: true,
        },
      },
    },
  });
}

export const commentRepository = {
  create,
  findMany,
};
