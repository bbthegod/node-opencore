const httpStatus = require('http-status');
const config = require('../../config/config');
const ErrorHandler = require('../helpers/ErrorHandler');

function master(req, res, next) {
  if (req.token && req.token === config.masterSecret) return next();
  return next(new ErrorHandler('Master key is not correct', httpStatus.UNAUTHORIZED, true));
}

module.exports = { master };
