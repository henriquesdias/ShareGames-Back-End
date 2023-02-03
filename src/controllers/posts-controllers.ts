import { Request, Response } from "express";

import { STATUS_CODE } from "../helpers/status-code";
import postsService from "../services/posts-services";
import { descriptionPost } from "../protocols";

export async function getPosts(req: Request, res: Response) {
  try {
    const posts = await postsService.getPosts();
    res.status(STATUS_CODE.OK).send(posts);
  } catch (error) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }
}

export async function createPost(req: Request, res: Response) {
  const { description } = res.locals.body as descriptionPost;
  const { userId } = res.locals;

  try {
    const newPost = await postsService.createPost(userId, description);
    res.status(STATUS_CODE.CREATED).send(newPost);
  } catch (error) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }
}
