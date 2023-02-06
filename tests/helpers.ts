import jwt from "jsonwebtoken";

import { prisma } from "../src/config/database-postgres";
import { Users } from "@prisma/client";

export async function cleanDatabase() {
  await prisma.comments.deleteMany();
  await prisma.posts.deleteMany();
  await prisma.users.deleteMany();
}

export function generateValidToken(user: Users) {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET
  );
}
