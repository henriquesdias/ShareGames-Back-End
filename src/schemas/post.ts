import joi from "joi";

export const postSchema = joi.object({
  description: joi.string().required().trim().max(255),
});
