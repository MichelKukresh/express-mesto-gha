const ERROR_CODE = 400;
const ERROR_ID = 404;

const errorMessageSwitsh = (err, req, res) => {
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

    default:
      res.status(500).send({ message: 'Произошла ошибка' });
      break;
  }
};

module.exports = errorMessageSwitsh;
