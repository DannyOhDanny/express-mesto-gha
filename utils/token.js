const jwt = require('jsonwebtoken');
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const checkAuth = (token) => {
  if (!token) {
    return false;
  }
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return false;
  }
};

module.exports = { checkAuth };
