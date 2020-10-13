/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable max-classes-per-file */
const httpStatus = require('http-status');

class ExtendableError extends Error {
  constructor(message, status, isPublic) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
  }
}

class ErrorHandler extends ExtendableError {
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR) {
    super(message, status);
  }
}

module.exports = ErrorHandler;
