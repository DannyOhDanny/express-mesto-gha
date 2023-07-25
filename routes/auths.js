const authRouter = require('express').Router();
const { login, createUser } = require('../constrollers/users');
const {
  signinValidation,
  signupValidation,
} = require('../middlewares/validations');

authRouter.post('/signin', signinValidation, login);
authRouter.post('/signup', signupValidation, createUser);

module.exports = authRouter;
