const ERROR_CODE = 400;
const ERROR_ID = 404;

module.exports.errorMessageUser = (err, req, res, messageErr = 'пользователя') => {
  const errMessage1 = err.name === 'Error' ? err.message : err.name; // для orFail, так как у них Error не отличается, исравнивать можно по mesage

  switch (errMessage1) {
    case 'ValidationError':
      res.status(ERROR_CODE).send({
        message: `Переданы некорректные данные при создании ${messageErr}`,
      });
      break;
    case 'CastError':
      res
        .status(ERROR_CODE)
        .send({ message: 'Некорректный id пользователя' });
      break;
    case 'NonExistentUser':
      res
        .status(ERROR_ID)
        .send({ message: 'Пользователь по указанному id не найден' });
      break;

    default:
      res.status(500).send({ message: 'Произошла ошибка' });
      break;
  }
};

// module.exports = errorMessageUser;

module.exports.errorMessageCard = (err, req, res) => {
  const errMessage = err.name === 'Error' ? err.message : err.name;
  switch (errMessage) {
    case 'ValidationError':
      res.status(ERROR_CODE).send({
        message: 'Переданы некорректные данные для постановки/снятии лайка.',
      });
      break;
    case 'CastError':
      res
        .status(ERROR_CODE)
        .send({ message: 'Передан некорректный _id карточки.' });
      break;
    case 'NonExistentCard':
      res
        .status(ERROR_ID)
        .send({ message: 'Передан несуществующий _id карточки.' });
      break;
    case 'NonisOwnerCard':
      res
        .status(ERROR_ID)
        .send({ message: 'Карточку может удалить только хозяим карточки' });
      break;
    default:
      res.status(500).send({ message: 'Произошла ошибка' });
      break;
  }
};

// module.exports = errorMessageCard;  NonisOwnerCard
