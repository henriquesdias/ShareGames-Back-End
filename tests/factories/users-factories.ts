import { faker } from "@faker-js/faker";

import { prisma } from "../../src/config/database-postgres";

export async function createUser() {
  return prisma.users.create({
    data: {
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
    },
  });
}
