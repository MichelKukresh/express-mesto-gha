const mongoose = require("mongoose");

const cardsSchema = new mongoose.Schema({
  name: {
    // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },

  link: {
    // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
  },
  owner: {
    // у пользователя есть имя — опишем требования к имени в схеме:
    type: Object, // тип ObjectId
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
  },
  likes: {
    // у пользователя есть имя — опишем требования к имени в схеме:
    type: Object, // тип ObjectId
    default: [],
  },
  createdAt: {
    // у пользователя есть имя — опишем требования к имени в схеме:
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Card', cardsSchema);