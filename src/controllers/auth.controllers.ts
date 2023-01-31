import { Request, Response } from "express";

import { STATUS_CODE } from "../helpers/status-code";
import { authService } from "../services/auth.services";
import { newUser, loginInfo } from "../protocols";

export async function createNewUser(req: Request, res: Response) {
  const user = res.locals.body as newUser;
  try {
    await authService.createNewUser(user);
    res.sendStatus(STATUS_CODE.CREATED);
  } catch (error) {
    res.status(STATUS_CODE.CONFLICT).send(error.message);
  }
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = res.locals.body as loginInfo;
  try {
    const token = await authService.signIn(email, password);
    res.status(STATUS_CODE.OK).send({ token });
  } catch (error) {
    res.status(STATUS_CODE.UNAUTHORIZED).send(error.message);
  }
}
