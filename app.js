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

// logger
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');

const routesCards = require('./routes/cards');
const routesUsers = require('./routes/users');
const auth = require('./middlewares/auth');
const { regexLink } = require('./util/utilConst');
const ErrorNotFound = require('./errors/ErrorNotFound');
const centralizedErrorHandler = require('./middlewares/centralizedErrorHandler');

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

// !!важно до роутов
app.use(requestLogger); // подключаем логгер запросов

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexLink),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use('/cards', routesCards); // запускаем

app.use('/users', routesUsers);

// !!вадно до обработчика ошибок, но после маршрутов
app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use('*', (req, res, next) => {
  next(new ErrorNotFound('Неправильный путь'));
});

// централизованный обработчик ошибок
app.use(centralizedErrorHandler);

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
});
