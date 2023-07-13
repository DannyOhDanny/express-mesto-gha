const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(201).send({ users, message: "Все пользователи" });
    })
    .catch(() => {
      res.status(500).send({
        message: "Серверная ошибка",
      });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.status(201).send({ user, message: "Пользователь найден" });
    })
    .catch(() => {
      res.status(404).send({
        message: "Пользователь не найден",
      });
    });
};

const postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send({ user, message: "Пользователь создан" });
    })
    .catch(() => {
      res.status(500).send({
        message: "Серверная ошибка",
      });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      res.status(200).send({ user, message: "Профиль обновлен" });
    })
    .catch(() => {
      res.status(500).send({
        message: "Серверная ошибка",
      });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      res.status(200).send({ user, message: "Аватар обновлен" });
    })
    .catch(() => {
      res.status(500).send({
        message: "Серверная ошибка",
      });
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  updateAvatar,
};
