import { Comments } from "@prisma/client";

export type newUser = {
  email: string;
  password: string;
  username: string;
  picture?: string;
};

export type loginInfo = Omit<newUser, "username" | "picture">;

export type descriptionPost = {
  description: string;
};

export type newComment = Omit<Comments, "id" | "createdAt" | "deletedAt">;
