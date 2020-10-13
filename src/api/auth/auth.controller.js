const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const config = require('../../../config/config');
const User = require('../user/user.model');
const ErrorHandler = require('../../helpers/ErrorHandler.js');

function successResponse(user, res) {
  const token = jwt.sign(
    {
      _id: user.id,
      username: user.username,
    },
    config.jwtSecret,
  );
  res.status(httpStatus.OK).json({
    token,
    user: {
      username: user.username,
      phone: user.role,
    },
  });
}

function errorResponse(next) {
  const err = new ErrorHandler('Authentication error', httpStatus.UNAUTHORIZED, true);
  return next(err);
}

async function login(req, res, next) {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    bcrypt.compare(password, user.password, (err, decode) => {
      if (decode) return successResponse(user, res);
      return errorResponse(next);
    });
  } else {
    errorResponse(next);
  }
}

// eslint-disable-next-line no-unused-vars
function check(req, res, next) {
  res.status(httpStatus.OK).end();
}

async function signup(req, res) {
  const { username, password, phone } = req.body;
  const duplicate = await User.findOne({ username });
  if (duplicate) return res.status(httpStatus.CONFLICT).json('Username adready exits');
  let user = new User({ username, password, phone });
  user = await user.save();
  return res.json(user);
}

module.exports = { login, check, signup };
