const routesUsers = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate');

const { allUsers } = require('../controllers/users');
const { idUsers } = require('../controllers/users');
const { updateUsers } = require('../controllers/users');
const { updateAvatarUsers } = require('../controllers/users');
const { meUsers } = require('../controllers/users');

routesUsers.get('/', allUsers);

routesUsers.get('/me', meUsers);
routesUsers.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }).unknown(true),
}), idUsers);

routesUsers.patch('/me', updateUsers);
routesUsers.patch('/me/avatar', updateAvatarUsers);

module.exports = routesUsers; // экспортировали роутер
