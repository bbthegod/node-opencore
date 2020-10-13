const httpStatus = require('http-status');
const expressValidation = require('express-validation');
const ErrorHandler = require('../helpers/ErrorHandler');

// eslint-disable-next-line no-unused-vars
const handler = (err, req, res, next) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  if (process.env !== 'development') {
    delete response.stack;
  }

  res.status(err.status);
  res.json(response);
};
exports.handler = handler;

exports.converter = (err, req, res, next) => {
  let convertedError = err;
  if (err instanceof expressValidation.ValidationError) {
    convertedError = new ErrorHandler({
      message: 'Validation Error',
      errors: err.errors,
      status: err.statusCode,
      stack: err.details,
    });
  } else if (!(err instanceof ErrorHandler)) {
    convertedError = new ErrorHandler({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }

  return handler(convertedError, req, res, next);
};

exports.notFound = (req, res, next) => {
  const err = new ErrorHandler({
    message: 'API Not Found !',
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res, next);
};
