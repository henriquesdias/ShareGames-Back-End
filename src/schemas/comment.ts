import joi from "joi";

export const schemaComment = joi.object({
  description: joi.string().required().trim().max(255),
});
