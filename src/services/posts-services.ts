import { postsRepository } from "../repository/posts-repository.js";

async function getPosts() {
  const posts = await postsRepository.findMany();
  return posts;
}

export const postsService = {
  getPosts,
};
