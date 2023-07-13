const cardRouter = require("express").Router();
const {
  getCards,
  postCard,
  deleteCardById,
  likeCard,
  deleteLikeCard,
} = require("../constrollers/cards");

cardRouter.get("/", getCards);
cardRouter.post("/", postCard);
cardRouter.delete("/:id", deleteCardById);
cardRouter.put("/:id/likes", likeCard);
cardRouter.delete("/:id/likes", deleteLikeCard);

module.exports = cardRouter;
