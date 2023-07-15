const validator = require('validator');
const User = require('../models/user');
const { NotFound , BadRequest } = require('../utils/errors');

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
    // if (!req.params.id) {
    //   throw new NotFound("Введите правильный ID пользователя");
    // }
    if (!validator.isMongoId(req.params.id)) {
      throw new NotFound('Введите правильный ID пользователя');
    }
    const user = await User.findById(req.params.id);
    if (user === null) {
      throw new BadRequest('Пользователь с таким ID не найден');
    } else {
      res.status(200).send({ user });
    }
  } catch (err) {
    next(err);
  }
};

const postUser = async (req, res, next) => {
  const { name, about, avatar } = req.body;
  try {
    // if (!name || !about || !avatar) {
    //   throw new BadRequest("Не заполнено обязательное поле");
    // }
    // if (name.length < 2 || about.length < 2) {
    //   throw new BadRequest("Поле должно содержать более 2 символов");
    // }
    // if (about.length > 30 || name.length > 30) {
    //   throw new BadRequest("Поле должно содержать не более 30 символов");
    // }
    // if (!validator.isURL(avatar)) {
    //   throw new BadRequest("Введите правильный URL");
    // }
    const user = await User.create({ name, about, avatar });
    res.status(201).send({ user });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { name, about } = req.body;

  try {
    // if (!name) {
    //   throw new BadRequest('Не заполнено поле "Имя"');
    // }
    // if (!about) {
    //   throw new BadRequest('Не заполнено поле "О себе"');
    // }

    // if (about.length < 2 || name.length < 2) {
    //   throw new BadRequest("Поле должно содержать более 2 символов");
    // }
    // if (about.length > 30 || name.length > 30) {
    //   throw new BadRequest("Поле должно содержать не более 30 символов");
    // }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};

const updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    // if (!validator.isURL(avatar)) {
    //   throw new BadRequest("Введите правильный URL");
    // }
    // if (!avatar) {
    //   throw new BadRequest('Не заполнено поле "Ссылка на аватар"');
    // }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).send({ user });
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
};
