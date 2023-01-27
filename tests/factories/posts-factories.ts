import { faker } from "@faker-js/faker";

import { prisma } from "../../src/config/database-postgres";

export async function createPost(userId: number) {
  return prisma.posts.create({
    data: {
      userId,
      description: faker.random.alphaNumeric(),
    },
  });
}
