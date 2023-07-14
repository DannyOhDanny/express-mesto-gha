const userRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  updateAvatar,
} = require('../constrollers/users');

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', postUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;
