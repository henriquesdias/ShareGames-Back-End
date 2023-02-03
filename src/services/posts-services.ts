import { postsRepository } from "../repository/posts-repository";

async function getPosts() {
  const posts = await postsRepository.findMany();
  return posts;
}

async function createPost(userId: number, description: string) {
  return postsRepository.create(userId, description);
}

const postsService = {
  getPosts,
  createPost,
};

export default postsService;
