import { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";

import { STATUS_CODE } from "../helpers/status-code";

export function validateBody(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(STATUS_CODE.UNPROCESSABLE_ENTITY)
        .send(error.details.map((e) => e.message));
    }
    res.locals.body = value;
    next();
  };
}
