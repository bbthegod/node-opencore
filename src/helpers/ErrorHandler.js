/* eslint-disable max-classes-per-file */
const httpStatus = require('http-status');

class ExtendableError extends Error {
  constructor(message, status) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
  }
}

class ErrorHandler extends ExtendableError {
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR) {
    super(message, status);
  }
}

module.exports = ErrorHandler;
