const Card = require('../models/card');
// const User = require('../models/user');

const { errorMessageCard } = require('../errors/errors');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = { _id: req.user._id };
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessageCard(err, req, res));
};

module.exports.allCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessageCard(err, req, res));
};

// удаление карточки
module.exports.idCards = (req, res) => {
  // определение создаткля карточки
  // const { _id } = req.user;
  Card.findById(req.params.id)
    .then((card) => {
      if (card.owner._id !== req.user._id) {
        throw new Error('NonisOwnerCard');
      }
    })
    .then(() => {
      Card.findByIdAndRemove(req.params.id)
        .orFail(new Error('NonExistentCard'))
        .then((card) => res.send({ data: card }));
    })
    .catch((err) => errorMessageCard(err, req, res));
};

module.exports.likesCardPut = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new Error('NonExistentCard'))
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessageCard(err, req, res));
};

module.exports.likesCardDelete = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new Error('NonExistentCard'))
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessageCard(err, req, res));
};
