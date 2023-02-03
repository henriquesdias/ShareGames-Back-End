import { Request, Response } from "express";

import { STATUS_CODE } from "../helpers/status-code";
import commentsService from "../services/comments-services";

export default async function createComment(req: Request, res: Response) {
  const { userId } = res.locals;
  const postId = Number(req.params.postId);
  const { description } = res.locals.body;
  try {
    const comment = await commentsService.createComment({
      description,
      userId,
      postId,
    });
    res.status(STATUS_CODE.CREATED).send(comment);
  } catch (error) {
    if (error.name === "postDoNotExists") {
      return res.status(STATUS_CODE.NOT_FOUND).send(error.message);
    }
    if (error.name === "invalidPostId") {
      return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(error.message);
    }
    res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }
}
