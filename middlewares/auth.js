/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../utils/errors');

// const { checkAuth } = require('../utils/token');

const auth = async (req, res, next) => {
  const token = await req.cookies.jwt;
  console.log(`Токен ${token}`);

  if (!token) {
    throw new Unauthorized('Доступ отклонен(токен)');
  }
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    console.log(payload);

    req.user = payload;

    console.log(req.user);

    return next();
  } catch (err) {
    throw new Unauthorized('Доступ отклонен(ошибка)');
  }
  // //console.log(req.cookies);
  // if (!req.cookies) {
  //   throw new Unauthorized('Доступ отклонен');
  // }
  // const token = await req.cookies.jwt;
  // //console.log(`Токен ${token}`);
  // if (!token) {
  //   throw new Unauthorized('Токен отсутствует');
  // }
  // const payload = await checkAuth(token);
  // //console.log(payload);
  // if (!payload) {
  //   throw new Unauthorized('Вы не авторизированы');
  // }
  // req.user = payload;
  // //console.log(req.user);
  // next();
};

module.exports = {
  auth,
};
