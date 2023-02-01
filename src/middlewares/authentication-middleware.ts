import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { STATUS_CODE } from "../helpers/status-code";

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    res.locals.userId = userId;
    next();
  } catch (err) {
    res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
}
