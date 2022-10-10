import Joi from "joi";

export default {
  register: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    // otpCode :Joi.string().required(),
  })
}