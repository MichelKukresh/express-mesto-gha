const User = require("../models/user");

const ERROR_CODE = 400;
const ERROR_ID = 404;
const errorMessage = (err, req, res, messageErr = "пользователя") => {
  if (err.name === "ValidationError") {
    res
      .status(ERROR_CODE)
      .send({
        message: `Переданы некорректные данные при создании ${messageErr}`,
      });
  } else if (err.name === "CastError") {
    const id = req.params.id == undefined ? req.user._id : req.params.id;
    res
      .status(ERROR_ID)
      .send({ message: `Пользователь по указанному ${id} не найден` });
  } else {
    res.status(500).send({ message: "Произошла ошибка" });
  }
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => errorMessage(err, req, res));
};

module.exports.allUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.idUsers = (req, res) => {
  const { id } = req.params;
  User.find({ _id: id })
    .then((user) => res.send({ data: user }))
    .catch((err) => errorMessage(err, req, res));
};

module.exports.updateUsers = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => errorMessage(err, req, res));
};

module.exports.updateAvatarUsers = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => errorMessage(err, req, res, (messageErr = "аватара")));
};
