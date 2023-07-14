const validator = require('validator');
const Card = require('../models/card');
const { BadRequest, NotFound } = require('../utils/errors');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    if (cards.length === 0) {
      throw new NotFound('Cписок карточек пуст');
    } else {
      res.status(201).send({ cards });
    }
  } catch (err) {
    next(err);
  }
};

const postCard = async (req, res, next) => {
  const { name, link } = req.body;
  try {
    if (!name || !link) {
      throw new BadRequest('Не заполнено обязательное поле');
    }

    if (name.length < 2 || name.length > 30) {
      throw new BadRequest('Поле должно содержать от 2 до 30 символов');
    }
    if (!validator.isURL(link)) {
      throw new BadRequest('Введите правильный URL');
    }
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(201).send({ card });
  } catch (err) {
    next(err);
  }
};

const deleteCardById = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new BadRequest('Введите ID карточки');
    }
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
    if (!req.params.id) {
      throw new NotFound('Введите ID');
    }
    if (!validator.isMongoId(req.params.id)) {
      throw new NotFound('Формат ID неверный');
    }
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
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
    if (!req.params.id) {
      throw new NotFound('Введите ID');
    }
    if (!validator.isMongoId(req.params.id)) {
      throw new NotFound('Формат ID неверный');
    }

    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
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
