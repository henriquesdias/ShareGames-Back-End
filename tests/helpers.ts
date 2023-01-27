import { prisma } from "../src/config/database-postgres";

export async function cleanDatabase() {
  await prisma.comments.deleteMany();
  await prisma.posts.deleteMany();
  await prisma.users.deleteMany();
}
