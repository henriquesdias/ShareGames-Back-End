import { prisma } from "../config/database-postgres";
import { newUser } from "../protocols";

async function create(user: newUser) {
  return prisma.users.create({
    data: user,
  });
}
async function findUserByEmail(email: string) {
  return prisma.users.findUnique({
    where: {
      email,
    },
  });
}
async function getUserByUsername(username: string) {
  return prisma.users.findUnique({
    where: {
      username,
    },
  });
}

export const authRepository = {
  create,
  findUserByEmail,
  getUserByUsername,
};
