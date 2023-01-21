import { faker } from "@faker-js/faker";

import { prisma } from "../../src/config/database-postgres";

export async function createComment(userId: number, postId: number) {
  return prisma.comments.create({
    data: {
      userId,
      postId,
      description: faker.random.alphaNumeric(),
    },
  });
}
