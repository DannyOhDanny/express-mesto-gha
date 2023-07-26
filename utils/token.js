// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');

const checkAuth = (token) => {
  if (!token) {
    return false;
  }
  try {
    const payload = jwt.verify(token, 'some-secret-key');
    return payload;
  } catch (err) {
    return false;
  }
};

module.exports = { checkAuth };
