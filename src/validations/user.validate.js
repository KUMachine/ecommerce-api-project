import Joi from "joi";

const userValidate = Joi.object({
  username: Joi.string().min(2).max(25).required(),
  // .regex(/^[a-zA-Z]+$/)
  // .messages({
  //   "string.pattern.base":
  //     "username: must contain alphabetic characters only",
  // }),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export default userValidate;
