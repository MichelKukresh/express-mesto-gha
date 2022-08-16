const routesCards = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate');

const { createCard } = require('../controllers/cards');
const { allCards } = require('../controllers/cards');
const { idCards } = require('../controllers/cards');
const { likesCardPut } = require('../controllers/cards');
const { likesCardDelete } = require('../controllers/cards');
const { regexLink } = require('../util/utilConst');

routesCards.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regexLink),
  }),
}), createCard);

routesCards.get('/', allCards);

routesCards.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), idCards);

routesCards.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), likesCardPut);

routesCards.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), likesCardDelete);

module.exports = routesCards; // экспортировали роутер
