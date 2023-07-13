const Card = require("../models/card");

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(201).send({ cards, message: "Все карточки" });
    })
    .catch(() => {
      res.status(500).send({
        message: "Серверная ошибка",
      });
    });
};

const postCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send({ card, message: "Карточка создана" });
    })
    .catch(() => {
      res.status(500).send({
        message: "Серверная ошибка",
      });
    });
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((user) => {
      res.status(200).send({ user, message: "Карточка удалена" });
    })
    .catch(() => {
      res.status(404).send({
        message: "Карточка не найдена",
      });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((user) => {
      res.status(200).send({ user, message: "Лайк поставлен" });
    })
    .catch(() => {
      res.status(404).send({
        message: "Карточка не найдена",
      });
    });
};

const deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((user) => {
      res.status(200).send({ user, message: "Лайк удален" });
    })
    .catch(() => {
      res.status(404).send({
        message: "Карточка не найдена",
      });
    });
};

module.exports = {
  getCards,
  postCard,
  deleteCardById,
  likeCard,
  deleteLikeCard,
};
