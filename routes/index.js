const express = require('express');
const app = express.Router();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false})

const sendHtml = require("../services/sendHtml")
const arduino = require("../services/handleArduinoDatas")
const handler = require("../controllers/arduino")

app.get('/', sendHtml.index);

app.post('/arduinoData', handler.saveArduinoData) //сюда обращается сама ардуинка
app.get('/arduinoData', handler.getArduinoData) //сюда обращается клиент для получения инфы о датчиках 


module.exports = app;
