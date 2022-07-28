// const express = require('express');
// const userController = require('../controller/users');
// const routes = express.Router();
// routes.get('/', userController.getUsers)

const routesUsers = require('express').Router(); // создали роутер

const User = require('../models/user');
const { createUser } = require('../controllers/users');

routesUsers.post('/', createUser);

routesUsers.get('/', (req, res) => {
  //res.send({...req.body, gggg: "ghfghf"});
  console.log("Привет гет");
  res.send(req.query);


});

module.exports = routesUsers; // экспортировали роутер