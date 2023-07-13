const validator = require("validator");
const User = require("../models/user");
const { BadRequest, NotFound } = require("../utils/errors");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      throw new NotFound("Cписок пользователей пуст");
    } else {
      res.status(201).send({ users, message: "Список пользователей" });
    }
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.id)) {
      throw new NotFound("Введите правильный ID пользователя");
    }
    const user = await User.findById(req.params.id);
    res.status(200).send({ user, message: "Профиль пользователя найден" });
  } catch (err) {
    next(err);
  }
};

const postUser = async (req, res, next) => {
  const { name, about, avatar } = req.body;
  try {
    if (!name || !about || !avatar) {
      throw new BadRequest("Не заполнено обязательное поле");
    }

    if (name.length < 2 || about.length < 2) {
      throw new BadRequest("Поле должно содержать более 2 символов");
    }
    if (about.length > 30 || name.length > 30) {
      throw new BadRequest("Поле должно содержать не более 30 символов");
    }
    if (!validator.isURL(avatar)) {
      throw new BadRequest("Введите правильный URL");
    }
    const user = await User.create({ name, about, avatar });
    res.status(200).send({ user, message: "Профиль пользователя создан" });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { name, about } = req.body;

  try {
    if (!name) {
      throw new BadRequest('Не заполнено поле "Имя"');
    }
    if (!about) {
      throw new BadRequest('Не заполнено поле "О себе"');
    }
    if (about.length < 2 || name.length < 2) {
      throw new BadRequest("Поле должно содержать более 2 символов");
    }
    if (about.length > 30 || name.length > 30) {
      throw new BadRequest("Поле должно содержать не более 30 символов");
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).send({ user, message: "Профиль обновлен" });
  } catch (err) {
    next(err);
  }
};

const updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    if (!validator.isURL(avatar)) {
      throw new BadRequest("Введите правильный URL");
    }
    if (!avatar) {
      throw new BadRequest('Не заполнено поле "Ссылка на аватар"');
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).send({ user, message: "Аватар обновлен" });
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