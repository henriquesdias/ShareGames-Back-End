import { Router } from "express";

import { getPosts } from "../controllers/posts-controller.js";

const postRouter = Router();

postRouter.get("/", getPosts);

export { postRouter };
