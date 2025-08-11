import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string()
    .trim()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%&*])[A-Za-z\\d@#$%&*]{6,30}$"
      )
    )
    .required(),
});
