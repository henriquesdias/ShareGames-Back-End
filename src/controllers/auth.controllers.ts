import { Request, Response } from "express";

import { STATUS_CODE } from "../helpers/status-code";
import { authService } from "../services/auth.services";
import { newUser } from "../protocols";

export async function createNewUser(req: Request, res: Response) {
  try {
    const user = res.locals.body as newUser;
    const newUser = await authService.createNewUser(user);
    res.sendStatus(STATUS_CODE.CREATED);
  } catch (error) {
    res.status(STATUS_CODE.CONFLICT).send(error.message);
  }
}
