const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const { JWT_SECRET } = require('../../config/config');
const User = require('../user/user.model');

function successResponse(user, res) {
  const token = jwt.sign({ _id: user.id, username: user.username }, JWT_SECRET);
  res.status(httpStatus.OK).json({
    token,
    user: { username: user.username, phone: user.role },
  });
}

function errorResponse(res) {
  return res.status(httpStatus.UNAUTHORIZED).json('UNAUTHORIZED');
}

async function login(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    bcrypt.compare(password, user.password, (err, decode) => {
      if (decode) return successResponse(user, res);
      return errorResponse(res);
    });
  } else {
    errorResponse(res);
  }
}

function check(req, res) {
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
