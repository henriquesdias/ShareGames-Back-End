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

export const commentRepository = {
  create,
};
