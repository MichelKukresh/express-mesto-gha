const routesUsers = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate');

const { allUsers } = require('../controllers/users');
const { idUsers } = require('../controllers/users');
const { updateUsers } = require('../controllers/users');
const { updateAvatarUsers } = require('../controllers/users');
const { meUsers } = require('../controllers/users');
const { regexLink } = require('../util/utilConst');

routesUsers.get('/', allUsers);

routesUsers.get('/me', meUsers);
routesUsers.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), idUsers);

routesUsers.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUsers);

routesUsers.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(regexLink),
  }),
}), updateAvatarUsers);

module.exports = routesUsers; // экспортировали роутер
