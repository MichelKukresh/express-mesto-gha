const User = require('../models/user');
const { errorMessageUser } = require('../errors/errors');

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.create({
    name, about, avatar, email, password,
  })
    .then((u) => res.send({
      _id: u._id,
      name: u.name,
      about: u.about,
      avatar: u.avatar,
    })).catch((err) => errorMessageUser(err, req, res));
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
