/* eslint-disable no-console */
const { Unauthorized } = require('../utils/errors');
const { checkAuth } = require('../utils/token');

const auth = async (req, res, next) => {
  console.log(req.cookies);

  if (!req.cookies) {
    throw new Unauthorized('Доступ отклонен');
  }
  const token = await req.cookies.jwt;
  console.log(`Токен ${token}`);

  const payload = await checkAuth(token);
  console.log(payload);

  if (!payload) {
    throw new Unauthorized('Вы не авторизированы');
  }
  req.user = payload;
  console.log(req.user);

  next();
};

module.exports = {
  auth,
};
