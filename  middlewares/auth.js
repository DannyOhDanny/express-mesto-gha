const { Unauthorized } = require('../utils/errors');
const { checkAuth } = require('../utils/token');

const auth = (req, res, next) => {
  //console.log(req.cookies);

  if (!req.cookies) {
    throw new Unauthorized('Доступ отклонен');
  }
  const token = req.cookies.jwt;
  //console.log(`Токен ${token}`);

  const result = checkAuth(token);
  //console.log(result);

  if (!result) {
    throw new Unauthorized('Вы не авторизированы');
  }

  next();
};

module.exports = {
  auth,
};
