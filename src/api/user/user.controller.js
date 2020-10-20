const httpStatus = require('http-status');
const User = require('./user.model');

async function load(req, res, next, id) {
  const user = await User.findById(id);
  if (!user) return res.status(httpStatus.NOT_FOUND).end();
  req.user = user;
  return next();
}

function get(req, res) {
  return res.json(req.user);
}

function getMe(req, res) {
  return res.json(req.auth);
}

function updateMe(req, res) {
  const { phone } = req.body;
  const user = req.auth;
  user.phone = phone;
  user.save();
  return res.json(user);
}

async function create(req, res) {
  const { username, password, phone } = req.body;
  const duplicate = await User.findOne({ username });
  if (duplicate) return res.status(httpStatus.CONFLICT).json('Username already exist');
  const user = new User({ username, password, phone });
  user.save();
  return res.json(user);
}

function update(req, res) {
  const { phone } = req.body;
  const { user } = req;
  user.phone = phone;
  user.save();
  return res.json(user);
}

async function list(req, res) {
  const { limit = 50, skip = 1, filter, sort } = req.query;
  const users = await User.List({ limit, skip, filter, sort });
  return res.json(users);
}

function remove(req, res) {
  const { user } = req;
  user.remove();
  return res.json(user);
}

module.exports = { load, get, getMe, create, update, list, remove, updateMe };
