const express = require('express');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');


const routesCards  = require('./routes/cards.js'); // импортируем роутер
const routesUsers  = require('./routes/users.js'); // импортируем роутер

const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  //useCreateIndex: true,
    //useFindAndModify: false
});

app.use(express.json());


app.use('/cards', routesCards); // запускаем
app.use('/users', routesUsers); // запускаем

app.listen(PORT, () => {



//   app.post('/', (req, res) => {
//   res.send({...req.body, gggg: "ghfghf"});
// } );





    console.log(`App listening on port ${PORT}`)
})