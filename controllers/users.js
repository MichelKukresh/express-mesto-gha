const bcrypt = require('bcrypt'); // npm i bcrypt
const jwt = require('jsonwebtoken'); // npm i jsonwebtoken
const User = require('../models/user');
const { errorMessageUser } = require('../errors/errors');

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => (User.create({
      name, about, avatar, email, hash,
    })
      .then((u) => res.send({
        _id: u._id,
        name: u.name,
        about: u.about,
        avatar: u.avatar,
        email: u.email,
        password: u.password,
      })).catch((err) => errorMessageUser(err, req, res))));
};

module.exports.allUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => errorMessageUser(err, req, res));
};

module.exports.idUsers = (req, res) => {
  const { id } = req.params;
  User.find({ _id: id })
    .orFail(new Error('NonExistentUser'))
    .then((u) => res.send({
      _id: u[0]._id,
      name: u[0].name,
      about: u[0].about,
      avatar: u[0].avatar,
    })).catch((err) => errorMessageUser(err, req, res));
};

module.exports.updateUsers = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { runValidators: true, new: true },
  )
    .then((user) => res.send(user))
    .catch((err) => errorMessageUser(err, req, res));
};

module.exports.updateAvatarUsers = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { runValidators: true, new: true },
  )
    .then((user) => res.send(user))
    .catch((err) => errorMessageUser(err, req, res, 'аватара'));
};

// const User = require('../models/user');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' }); // создадим токен
      res.send({ token }); // вернём токен
    })
    .catch((err) => {
      // ошибка аутентификации
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports.meUsers = (req, res) => {
  const { _id } = req.user;
  User.find({ _id })
    .orFail(new Error('NonExistentUser'))
    .then((u) => res.send({
      _id: u[0]._id,
      name: u[0].name,
      about: u[0].about,
      avatar: u[0].avatar,
    })).catch((err) => errorMessageUser(err, req, res));
};
