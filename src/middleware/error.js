const httpStatus = require('http-status');
const expressValidation = require('express-validation');
const { ENVIRONMENT } = require('../config/config');
const ErrorHandler = require('../helpers/ErrorHandler');

exports.handler = (err, req, res, next) => {
  const error = new ErrorHandler(err.message, err.status, ENVIRONMENT === 'development' ? err.stack : null);
  return next(error);
};

exports.converter = (err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    return res.status(err.statusCode).json({
      message: err.error,
      stack: err.details,
    });
  }
  if (!(err instanceof ErrorHandler)) {
    const error = new ErrorHandler(err.message, err.status);
    return next(error);
  }
  return next(err);
};

exports.notFound = (req, res) => res.status(httpStatus.NOT_FOUND).json('No API !');
