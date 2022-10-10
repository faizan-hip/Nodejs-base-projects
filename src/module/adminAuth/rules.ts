import Joi from "joi";

export default {
  register: Joi.object().keys({
    fullName: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
}