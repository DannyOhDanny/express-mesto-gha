// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
// eslint-disable-next-line import/no-extraneous-dependencies
const User = require('../models/user');
// const { createToken } = require('../utils/token');
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

const createUser = async (req, res, next) => {
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
    res.status(201).send({
      _id: user._id,
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    });
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

    const user = await User.findOne({ email }).select('+password');
    if (!user || user === null) {
      throw new Unauthorized('Такого пользователя не существует');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Unauthorized('Неверный логин или пароль');
    }

    const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
      expiresIn: '7d',
    });
    // res.status(200).send({ token });
    res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true });

    res.status(200).send({
      _id: user._id,
      // email: user.email,
      message: 'Вы успешно авторизированы',
    });
    // res.end();
    // next();
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(req);
  try {
    const user = await User.findById(req.user.payload._id);

    if (user === null) {
      throw new NotFound('Cписок пользователей пуст');
    }
    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getUser,
};
