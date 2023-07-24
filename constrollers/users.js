// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
const validator = require('validator');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  Unauthorized,
  GeneralError,
  NotFound,
  BadRequest,
} = require('../utils/errors');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      throw new NotFound('Cписок пользователей пуст');
    } else {
      res.status(200).send({ users });
    }
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.id)) {
      throw new BadRequest('Введите правильный ID пользователя');
    }
    const user = await User.findById(req.params.id);
    if (user === null) {
      throw new NotFound('Пользователь с таким ID не найден');
    } else {
      res.status(200).send({ user });
    }
  } catch (err) {
    next(err);
  }
};

const postUser = async (req, res, next) => {
  const { name, about, email, password, avatar } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      email,
      password: hashPassword,
      avatar,
    });
    res.status(201).send({ user });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { name, about } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};

const updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!req.body) {
      throw new GeneralError('Серверная ошибка');
    }

    if (!email || !password) {
      throw new BadRequest('Не указан логин или пароль');
    }
    const user = await User.findOne({ email });
    if (!user || user === null) {
      throw new BadRequest('Такого пользователя не существует');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Unauthorized('Неверный логин или пароль');
    }
    // res.status(200).send({ user, message: 'Все верно!' });
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      'some-secret-key',
      {
        expiresIn: '7d',
      }
    );
    // res.status(200).send({ token });
    res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true });
    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  updateAvatar,
  login,
};
