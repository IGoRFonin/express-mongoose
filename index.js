// импортируем модули
const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const xml2js = require('xml2js');

// Выносим переменные для удоства
const Schema = mongoose.Schema;
const db = mongoose.connection;
const port = 3000;
const upload = multer();

// задаем инстанс экспресс сервера
const app = express();

// задаем шабланизатор
app.set('view engine', 'ejs');

// Выводим файл 'views/index.js'
app.get('/', (request, response) => response.render('index'));
// отдаем строку по get запросу
app.get('/test', (request, response) => response.send('it is test'));
// принимаем пост запрос и обрабатываем multipart/form-data
// с помощью upload.single('file')
// потом парсим xml файл в json
app.post('/test', upload.single('file'), (request, response) => {
    const str = request.file.buffer.toString();

    xml2js.parseString(str, function (err, result) {
        console.log(JSON.stringify(result));
    })

    response.send('it is test');
});
// отдаем get строку
app.get('/qwerty', (request, response) => response.send('DA ETO JESTKO!'));

// соедниняемся с базой данный
mongoose.connect('mongodb://test:qwerty12@ds115543.mlab.com:15543/test1', { useNewUrlParser: true });

// создаем схему коллекции
const testSchema = new Schema({
    title: String
});

// создаем молель
const Test = mongoose.model('Test', testSchema);

// Слушаем листенер когда произойдет соединение к базу
db.once('open', function () {
    // запускаем сервер
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
});
