import { Router } from "express";

import { validateBody } from "../middlewares/validate-body";
import { userSchema, loginSchema } from "../schemas/user";
import { createNewUser, signIn } from "../controllers/auth-controllers";

const authRouter = Router();

authRouter
  .post("/sign-up", validateBody(userSchema), createNewUser)
  .post("/sign-in", validateBody(loginSchema), signIn);

export { authRouter };
