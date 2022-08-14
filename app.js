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
app.use(errors()); // обработчик ошибок celebrate

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
}), login);

app.use(auth);

app.use('/cards', routesCards); // запускаем
app.use('/users', routesUsers); // запускаем

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Неправильный путь' });
});

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
});

// router.delete('/:postId', celebrate({
//   // валидируем параметры
//   params: Joi.object().keys({
//     postId: Joi.string().alphanum().length(24),
//   }),
//   headers: Joi.object().keys({
//     // валидируем заголовки
//   }),
//   query: Joi.object().keys({
//     // валидируем query
//   }),
// }), deletePost);
