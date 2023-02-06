import { Router } from "express";

import { authenticateToken } from "../middlewares/authentication-middleware";
import { validateBody } from "../middlewares/validate-body";
import createComment from "../controllers/comments-controllers";
import { schemaComment } from "../schemas/comment";

const commentRouter = Router();

commentRouter.post(
  "/comments/:postId/",
  authenticateToken,
  validateBody(schemaComment),
  createComment
);

export { commentRouter };
