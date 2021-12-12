import Joi from "joi";

const categoryValidate = Joi.object({
  name: Joi.string().min(2).max(225).required(),
  description: Joi.string().min(2).max(520).required(),
});

export default categoryValidate;
