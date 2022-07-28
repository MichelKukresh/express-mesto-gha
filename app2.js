// const express = require("express"); //подключаем экспресс
// const mongoose = require("mongoose");





// const path = require("path"); //что бы находить папки, а не разбираться в путях на устройстве /\..

// // Слушаем 3000 порт
// const { PORT = 3000 } = process.env;

// //const bodyParser = require('body-parser'); //Body-parser устанавливают из NPM:

// const app = express(); //создаем приложение

// const PUBLIC_FOLDER = path.join(__dirname, 'public');//это мидвер для находжения папки
// app.use(express.static(PUBLIC_FOLDER)); //раздает файл 37:16 вебинара

// app.use(express.json());//для распарсивания тела запроса, или его писать в каждый запрос app.post('/', express.json(), (req, res) => {  res.send(req.body);} )

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path} ${JSON.stringify(req.body)}`);
//   next();
// });



// ////подключаемся к серверу mongo
// mongoose.connect("mongodb://localhost:27017/mestodb", {
//   useNewUrlParser: true,
//   //useCreateIndex: true,
//   //useFindAndModify: false,
// });


// // app.post('/', (req, res) => {
// //   res.send({...req.body, gggg: "ghfghf"});
// // } )

// console.log(` Статус монгуса ${mongoose.connection.readyState} 0: отключен
// 1: подключенный
// 2: подключение
// 3: отсоединение`);


// app.listen(PORT, () => {
//   // Если всё работает, консоль покажет, какой порт приложение слушает
//   console.log(`App listening on port ${PORT}`);
// });

// // app.get('/', (req, res) => {
// //     res.send(req.query);
// //   });

// //запуск node index.js
