import { Router } from "express";

import { getPosts } from "../controllers/posts-controller";

const postRouter = Router();

postRouter.get("/", getPosts);

export { postRouter };
