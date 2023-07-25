const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const cookies = require('cookie-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const authRouter = require('./routes/auths');
const { auth } = require('./middlewares/auth');
const { handleErrors, error404 } = require('./utils/handleErrors');

// Слушаем 3000 порт
/* eslint operator-linebreak: ["error", "none"] */
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } =
  process.env;

const app = express();

app.use(cookies());
app.use(helmet());
app.use(express.json());

app.use('/', authRouter);
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

// eslint-disable-next-line no-unused-vars
app.use('/*', error404);
app.use(errors());
app.use(handleErrors);

mongoose.connect(DB_URL);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening to port ${PORT}`);
});
