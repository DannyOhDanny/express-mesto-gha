const jwt = require('jsonwebtoken');

const checkAuth = (token) => {
  if (!token) {
    return false;
  }
  try {
    return jwt.verify(token, 'some-secret-key');
  } catch {
    return false;
  }
};

module.exports = {
  checkAuth,
};
