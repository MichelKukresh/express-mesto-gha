const Card = require('../models/card');

const errorMessageCard = require('../errors/errors');

// const ERROR_CODE = 400;
// const ERROR_ID = 404;
// const errorMessage = (err, req, res) => {
//   if (err.name === 'ValidationError') {
//     res
//       .status(ERROR_CODE)
//       .send({ message: 'Переданы некорректные данные при создании карточки.' });
//   } else if (err.name === 'CastError') {
//     res
//       .status(ERROR_ID)
//       .send({ message: 'Карточка с указанным _id не найдена.' });
//   } else {
//     res.status(500).send({ message: 'Произошла ошибка' });
//   }
// };

// const errorMessageSwitsh = (err, req, res) => {
//   const errMessage = err.name === 'Error' ? err.message : err.name;

//   switch (errMessage) {
//     case 'ValidationError':
//       res.status(ERROR_CODE).send({
//         message: 'Переданы некорректные данные для постановки/снятии лайка.',
//       });
//       break;
//     case 'CastError':
//       res
//         .status(ERROR_CODE)
//         .send({ message: 'Передан некорректный _id карточки.' });
//       break;
//     case 'NonExistentCard':
//       res
//         .status(ERROR_ID)
//         .send({ message: 'Передан несуществующий _id карточки.' });
//       break;

//     default:
//       res.status(500).send({ message: 'Произошла ошибка' });
//       break;
//   }
// };

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

module.exports.idCards = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(new Error('NonExistentCard'))
    .then((card) => res.send({ data: card }))
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
