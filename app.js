const express = require('express');
const mongoose = require('mongoose');
//const helmet = require('helmet');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const handleErrors = require('./utils/handleErrors');

// Слушаем 3000 порт
/* eslint operator-linebreak: ["error", "none"] */
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } =
  process.env;

const app = express();

//app.use(helmet());

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64bb03d0f91b9c5b2de42a41', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/users', userRouter);

app.use('/cards', cardRouter);

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
