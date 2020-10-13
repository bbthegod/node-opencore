/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const config = require('../../config/config');
const User = require('../api/user/user.model');

function authentication(array) {
  return async (req, res, next) => {
    jwt.verify(req.token, config.jwtSecret, async (err, data) => {
      if (err) return next(err);
      const filter = { createdAt: 0, updatedAt: 0 };
      const user = await User.findOne({ studentCode: data.studentCode }, filter);
      if (user && array.indexOf(user.role) >= 0) {
        req.auth = user;
        return next();
      }
      return res.status(httpStatus.UNAUTHORIZED).end();
    });
  };
}

module.exports = { authentication };
