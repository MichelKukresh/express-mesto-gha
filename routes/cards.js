const routesCards = require('express').Router(); // создали роутер

const { createCard } = require("../controllers/cards");
const { allCards } = require("../controllers/cards");
const { idCards } = require("../controllers/cards");
const { likesCardPut } = require("../controllers/cards");
const { likesCardDelete } = require("../controllers/cards");

routesCards.post('/', createCard);

routesCards.get('/', allCards);

routesCards.delete('/:id', idCards);

routesCards.put('/:id/likes', likesCardPut);
routesCards.delete('/:id/likes', likesCardDelete);

module.exports = routesCards; // экспортировали роутер


