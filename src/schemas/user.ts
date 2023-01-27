import joi from "joi";

export const userSchema = joi.object({
  email: joi.string().email().max(150).required().trim(),
  password: joi.string().min(8).max(100).required().trim(),
  username: joi.string().min(3).max(50).required().trim(),
  picture: joi.string().trim(),
});
