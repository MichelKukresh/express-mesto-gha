const routesCards = require('express').Router(); // создали роутер
//const Film = require('../models/film');

const Card = require('../models/card');

routesCards.post('/', (req, res) => {
  res.send(req.body);
  console.log(req.body);
});

routesCards.get('/', (req, res) => {
  //res.send({...req.body, gggg: "ghfghf"});
  console.log("Привет гет");
  res.send(req.query);


});

module.exports = routesCards; // экспортировали роутер