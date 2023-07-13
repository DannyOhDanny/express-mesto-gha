const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "64adbda0635c3737bf82423f", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use("/users", userRouter);

app.use("/cards", cardRouter);

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`);
});
