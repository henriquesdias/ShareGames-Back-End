import { postsRepository } from "../repository/posts-repository";
import { commentRepository } from "../repository/comments-repository";
import { newComment } from "../protocols";

async function createComment({ postId, userId, description }: newComment) {
  if (!postId) {
    throw { name: "invalidPostId", message: "this postId is invalid" };
  }
  const post = await postsRepository.findUnique(postId);
  if (!post) {
    throw { name: "postDoNotExists", message: "this post do not exists" };
  }

  return await commentRepository.create({ postId, userId, description });
}

async function getAllComments(postId: number) {
  const post = await postsRepository.findUnique(postId);
  if (!post) {
    throw { name: "postDoNotExists", message: "this post do not exists" };
  }
  return commentRepository.findMany(postId);
}

const commentsService = {
  createComment,
  getAllComments,
};

export default commentsService;
