const ERROR_CODE = 400;
const ERROR_ID = 404;

const errorMessageSwitsh = (err, req, res, messageErr = 'пользователя') => {
  const errMessage = err.name === 'Error' ? err.message : err.name; // для orFail, так как у них Error не отличается, исравнивать можно по mesage

  switch (errMessage) {
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

module.exports = errorMessageSwitsh;
