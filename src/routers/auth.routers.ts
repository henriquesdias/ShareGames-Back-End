import { Router } from "express";

import { validateBody } from "../middlewares/validate-body";
import { userSchema } from "../schemas/user";
import { createNewUser } from "../controllers/auth.controllers";

const authRouter = Router();

authRouter.post("/sign-up", validateBody(userSchema), createNewUser);

export { authRouter };
