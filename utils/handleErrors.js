const { GeneralError, NotFound } = require('./errors');
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
  if (err.code === 11000) {
    return res.status(400).json({
      code: res.statusCode,
      status: err.name,
      message: [err.message, 'Данный пользователь уже зарегистрирован'],
    });
  }

  if (err.name === 'MongoServerError') {
    return res.status(400).json({
      code: res.statusCode,
      status: err.name,
      message: [err.message, 'Данный email или пароль уже зарегистрирован'],
    });
  }
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
