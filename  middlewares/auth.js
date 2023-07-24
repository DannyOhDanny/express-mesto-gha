const { NotFound } = require('../utils/errors');
const checkAuth = require('../utils/token');

const auth = (req, res, next) => {
  if (!req.cookies) {
    throw new NotFound('Доступ отклонен');
  }
  const { token } = req.cookies.jwt;
  const result = checkAuth(token);
  if (!result) {
    throw new NotFound('Доступ отклонен');
  }
  next();
};

module.exports = {
  auth,
};
