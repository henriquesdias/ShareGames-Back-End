import { Router } from "express";

import { getPosts } from "../controllers/posts-controllers";

const postRouter = Router();

postRouter.get("/", getPosts);

export { postRouter };
