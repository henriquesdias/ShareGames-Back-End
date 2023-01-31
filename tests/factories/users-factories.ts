import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

import { prisma } from "../../src/config/database-postgres";

export async function createUser(newPassword?: string) {
  const password = newPassword || faker.internet.password(8);
  const hash = await bcrypt.hash(password, 10);
  return prisma.users.create({
    data: {
      email: faker.internet.email(),
      password: hash,
      username: faker.internet.userName(),
    },
  });
}
