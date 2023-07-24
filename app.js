const express = require('express');
const cookies = require('cookie-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { auth } = require('./ middlewares/auth');
const { login, postUser } = require('./constrollers/users');
const handleErrors = require('./utils/handleErrors');

// Слушаем 3000 порт
/* eslint operator-linebreak: ["error", "none"] */
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } =
  process.env;

const app = express();

app.use(cookies());
app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64beaafc044ea71ef08647f5', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.post('/signin', login);
app.post('/signup', postUser);
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.use('/*', (req, res) => {
  res.status(404).send({
    status: res.statusCode,
    message: 'Ошибка 404. Страница не найдена',
  });
});

app.use(handleErrors);

mongoose.connect(DB_URL);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening to port ${PORT}`);
});
