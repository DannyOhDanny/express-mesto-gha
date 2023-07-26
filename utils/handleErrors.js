const { GeneralError, NotFound, ValidationError } = require('./errors');
// eslint-disable-next-line  no-unused-vars
const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      code: res.statusCode,
      status: err.name,
      message: err.message,
    });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      code: res.statusCode,
      status: err.name,
      message: ['Ошибка валидации', err.message],
    });
  }
  if (err.code === 11000 || err.name === 'MongoServerError') {
    throw new ValidationError('Данный пользователь уже зарегистрирован');
  }

  // if (err.name === 'MongoServerError') {
  //   return res.status(409).json({
  //     code: res.statusCode,
  //     status: err.name,
  //     message: err.message,
  //   });
  // }

  return res.status(500).json({
    code: res.statusCode,
    status: err.name,
    message: err.message,
  });
};

// eslint-disable-next-line no-unused-vars
const error404 = (req, res) => {
  throw new NotFound('Ошибка 404. Страница не найдена');
};
module.exports = { handleErrors, error404 };
