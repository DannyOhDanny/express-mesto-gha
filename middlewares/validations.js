// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().alphanum().min(2).max(30),
    about: Joi.string().alphanum().min(2).max(30),
    avatar: Joi.string().pattern(
      // eslint-disable-next-line prefer-regex-literals
      new RegExp(
        '(https://www.|http://www.|https://|http://)?[a-zA-Z0-9]{2,}(.[a-zA-Z0-9]{2,})(.[a-zA-Z0-9]{2,})?'
      )
    ),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().alphanum().min(2).max(30),
    about: Joi.string().alphanum().min(2).max(30),
  }),
});

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(
      // eslint-disable-next-line prefer-regex-literals
      new RegExp(
        '(https://www.|http://www.|https://|http://)?[a-zA-Z0-9]{2,}(.[a-zA-Z0-9]{2,})(.[a-zA-Z0-9]{2,})?'
      )
    ),
  }),
});

const idValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(
      // eslint-disable-next-line prefer-regex-literals
      new RegExp('^[0-9a-fA-F]{24}$')
    ),
  }),
});

const cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().alphanum().min(2).max(30),
    link: Joi.string().pattern(
      // eslint-disable-next-line prefer-regex-literals
      new RegExp(
        '(https://www.|http://www.|https://|http://)?[a-zA-Z0-9]{2,}(.[a-zA-Z0-9]{2,})(.[a-zA-Z0-9]{2,})?'
      )
    ),
  }),
});

module.exports = {
  signinValidation,
  signupValidation,
  updateUserValidation,
  updateAvatarValidation,
  idValidation,
  cardValidation,
};
