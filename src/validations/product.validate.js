import Joi from "joi";

const productValidate = Joi.object({
  name: Joi.string().min(2).max(225).required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().min(2).max(520).required(),
  image: Joi.string().required(),
  category: Joi.string().required(),
});

export default productValidate;
