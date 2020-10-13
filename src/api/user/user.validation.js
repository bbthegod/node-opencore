const { Joi } = require('express-validation');

module.exports = {
  create: {
    body: Joi.object({
      username: Joi.string().required(),
      phone: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },

  update: {
    body: Joi.object({
      username: Joi.string().required(),
      phone: Joi.string().required(),
    }),
    params: Joi.object({
      userId: Joi.string().hex().required(),
    }),
  },
};
