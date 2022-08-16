const express = require('express');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

// импортируем устанавливаем лимитер для исключения DoS атак npm i express-rate-limit
const rateLimit = require('express-rate-limit');

// использование helmet для простановки security-заголовков npm install --save helmet
const helmet = require('helmet');

const mongoose = require('mongoose');

const { createUser, login } = require('./controllers/users');

const routesCards = require('./routes/cards');
const routesUsers = require('./routes/users');
const auth = require('./middlewares/auth');

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

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.use(auth);

app.use('/cards', routesCards); // запускаем

app.use('/users', routesUsers);

app.use(errors()); // обработчик ошибок celebrate

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Неправильный путь' });
});

// централизованный обработчик ошибок
app.use((err, req, res, next) => {

  console.log("!!!!!!!!!!!!!");
  console.log(err.message);
  console.log(err.statusCode);
  console.log("!!!!!!!!!!!!!");
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res.status(err.statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
});

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
});
