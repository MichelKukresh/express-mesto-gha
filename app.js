const express = require("express");
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const mongoose = require("mongoose");

const routesCards = require("./routes/cards.js"); // импортируем роутер
const routesUsers = require("./routes/users.js"); // импортируем роутер

const app = express();

// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true
});

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "62e2b222311f2beb3b073f2b", // вставьте сюда _id созданного в предыдущем пункте пользователя 62e2b222311f2beb3b073f2b
  };

  next();
});

app.use("/cards", routesCards); // запускаем
app.use("/users", routesUsers); // запускаем

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
