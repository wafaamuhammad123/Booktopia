const Joi = require("joi");

const userValidation = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{5,30}$")).required(),
  email: Joi.string().email().required(),

}).unknown();
module.exports = userValidation;