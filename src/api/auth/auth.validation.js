const { Joi } = require('express-validation');

module.exports = {
  login: {
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  signup: {
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      phone: Joi.string().required(),
    }),
  },
};
