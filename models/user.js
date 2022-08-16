const mongoose = require('mongoose');
const validator = require('validator'); // npm i validator
const bcrypt = require('bcrypt'); // npm i bcrypt

const userSchema = new mongoose.Schema({
  name: {
    // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    // required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
    default: 'Жак-Ив Кусто',
  },

  about: {
    // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    // required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
    default: 'Исследователь',
  },

  avatar: {
    // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error('Invalid Url');
      }
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email');
      }
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Authorized'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Authorized'));
          }

          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('User', userSchema);
