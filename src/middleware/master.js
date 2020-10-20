const httpStatus = require('http-status');
const { MASTER_SECRET } = require('../config/config');

function master(req, res, next) {
  if (req.token && req.token === MASTER_SECRET) return next();
  return res.status(httpStatus.UNAUTHORIZED).json('MASTER KEY IS REQUIRED OR NOT CORRECT');
}

module.exports = master;
