require('dotenv').config();
const express = require('express');
const cookies = require('cookie-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const authRouter = require('./routes/auths');
const { auth } = require('./middlewares/auth');
const { handleErrors, error404 } = require('./utils/handleErrors');

// Слушаем 3000 порт
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } =
  process.env;
// console.log(require('crypto').randomBytes(32).toString('hex'));

const app = express();

app.use(cookies());
app.use(helmet());
app.use(express.json());

app.use('/', authRouter);
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.use('/*', error404);
app.use(errors());
app.use(handleErrors);

mongoose.connect(DB_URL);

app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`);
});
