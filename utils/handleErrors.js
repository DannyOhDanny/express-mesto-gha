const { GeneralError } = require('./errors');
// eslint-disable-next-line  no-unused-vars
const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      code: res.statusCode,
      status: err.name,
      message: err.message,
    });
  }

  return res.status(500).json({
    code: res.statusCode,
    status: err.name,
    message: err.message,
  });
};

module.exports = handleErrors;
