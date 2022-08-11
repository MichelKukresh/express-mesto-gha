const express = require('express');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

// импортируем устанавливаем лимитер для исключения DoS атак npm i express-rate-limit
const rateLimit = require('express-rate-limit');

// использование helmet для простановки security-заголовков npm install --save helmet
const helmet = require('helmet');

const mongoose = require('mongoose');

const routesCards = require('./routes/cards');
const routesUsers = require('./routes/users');

const app = express();

// настраиваем устанавливаем лимитер для исключения DoS атак
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());

// используем устанавливаем лимитер для исключения DoS атак
app.use(limiter);
app.use(helmet());
app.use((req, res, next) => {
  req.user = {
    _id: '62e2b222311f2beb3b073f2b', // вставьте сюда _id созданного в предыдущем пункте пользователя 62e2b222311f2beb3b073f2b
  };

  next();
});

app.use('/cards', routesCards); // запускаем
app.use('/users', routesUsers); // запускаем
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Неправильный путь' });
});

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
});
