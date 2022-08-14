const routesCards = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate');

const { createCard } = require('../controllers/cards');
const { allCards } = require('../controllers/cards');
const { idCards } = require('../controllers/cards');
const { likesCardPut } = require('../controllers/cards');
const { likesCardDelete } = require('../controllers/cards');

routesCards.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/),
  }).unknown(true),
}), createCard);

routesCards.get('/', allCards);

routesCards.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }).unknown(true),
}), idCards);

routesCards.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }).unknown(true),
}), likesCardPut);

routesCards.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }).unknown(true),
}), likesCardDelete);

module.exports = routesCards; // экспортировали роутер
