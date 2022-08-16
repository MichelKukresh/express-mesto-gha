const bcrypt = require('bcrypt'); // npm i bcrypt
const jwt = require('jsonwebtoken'); // npm i jsonwebtoken
const User = require('../models/user');
// const { errorMessageUser } = require('../errors/errors');
const ErrorAuthorized = require('../errors/ErrorAuthorized');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorValidationAndCast = require('../errors/ErrorValidationAndCast');

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => (User.create({
      name, about, avatar, email, password: hash,
    }))).then((u) => res.send({
      _id: u._id,
      name: u.name,
      about: u.about,
      avatar: u.avatar,
      email: u.email,
    })).catch((err) => next(err));
};

module.exports.allUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

module.exports.idUsers = (req, res, next) => {
  const { id } = req.params;
  User.find({ _id: id })
    .orFail(new ErrorNotFound('Пользователь по указанному id не найден'))
    .then((u) => res.send({
      _id: u[0]._id,
      name: u[0].name,
      about: u[0].about,
      avatar: u[0].avatar,
    })).catch((err) => next(err));
};

module.exports.updateUsers = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { runValidators: true, new: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorValidationAndCast('Переданы некорректные данные при создании аватара'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatarUsers = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { runValidators: true, new: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorValidationAndCast('Переданы некорректные данные при создании аватара'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' }); // создадим токен
      res.send({ token }); // вернём токен
    }).catch((err) => {
      if (err.message === 'Authorized') {
        next(new ErrorAuthorized('Неправильные почта или пароль'));
      } else {
        next(err);
      }
    });
};

module.exports.meUsers = (req, res, next) => {
  const { _id } = req.user;
  User.find({ _id })
    .orFail(new ErrorNotFound('Пользователь по указанному id не найден'))
    .then((u) => res.send({
      _id: u[0]._id,
      email: u[0].email,
      name: u[0].name,
      about: u[0].about,
      avatar: u[0].avatar,
    })).catch((err) => next(err));
};
