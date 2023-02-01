import { Router } from "express";

import { getPosts, createPost } from "../controllers/posts-controllers";
import { validateBody } from "../middlewares/validate-body";
import { postSchema } from "../schemas/post";
import { authenticateToken } from "../middlewares/authentication-middleware";

const postRouter = Router();

postRouter
  .get("/", getPosts)
  .post(
    "/create-post",
    authenticateToken,
    validateBody(postSchema),
    createPost
  );

export { postRouter };
