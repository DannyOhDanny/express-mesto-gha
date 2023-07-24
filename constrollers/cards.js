const validator = require('validator');
const Card = require('../models/card');
const { BadRequest, NotFound } = require('../utils/errors');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    if (cards.length === 0) {
      throw new NotFound('Cписок карточек пуст');
    } else {
      res.status(200).send({ cards });
    }
  } catch (err) {
    next(err);
  }
};

const postCard = async (req, res, next) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(200).send({ card });
  } catch (err) {
    next(err);
  }
};

const deleteCardById = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.id)) {
      throw new BadRequest('Формат ID неверный');
    }
    const card = await Card.findByIdAndRemove(req.params.id);
    if (card === null) {
      throw new NotFound('Карточка с таким ID не найдена');
    }
    res.status(200).send({ card });
  } catch (err) {
    next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.id)) {
      throw new BadRequest('Формат ID неверный');
    }
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true }
    );
    if (card === null) {
      throw new NotFound('Карточка не найдена');
    } else {
      res.status(201).send({ card });
    }
  } catch (err) {
    next(err);
  }
};

const deleteLikeCard = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.id)) {
      throw new BadRequest('Формат ID неверный');
    }

    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true }
    );
    if (card === null) {
      throw new NotFound('Карточка не найдена');
    } else {
      res.status(200).send({ card });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCards,
  postCard,
  deleteCardById,
  likeCard,
  deleteLikeCard,
};
