// const jwt = require('jsonwebtoken'); // npm i jsonwebtoken
// const User = require('../models/user');

// module.exports.login = (req, res) => {
//   const { email, password } = req.body;

//   return User.findUserByCredentials(email, password)
//     .then((user) => {
//       const token = jwt.sign({ _id: user._id }, 'some-secret-key'); // создадим токен
//       res.send({ token }); // вернём токен
//     })
//     .catch((err) => {
//       // ошибка аутентификации
//       res
//         .status(401)
//         .send({ message: err.message });
//     });
// };
