/* eslint max-classes-per-file: ["error", 4] */
/* eslint no-use-before-define: ["error", { "classes": false }] */

class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    if (this instanceof ValidationError) {
      return 400;
    }

    return 500;
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class ValidationError extends GeneralError {}

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  ValidationError,
};
