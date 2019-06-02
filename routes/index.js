const express = require('express');
const app = express.Router();

//const bodyParser = require('body-parser');
//const urlencodedParser = bodyParser.urlencoded({extended: false})

const sendHtml = require("../services/sendHtml")
const handler = require("../controllers/arduino")

//-------- рендер страниц -------------
app.get('/', sendHtml.index);


//---------- API ----------------------
app.get('/arduinoData', handler.getArduinoData) //сюда обращается клиент для получения инфы о датчиках 
app.post('/arduinoData', handler.deleteOldArticles, handler.saveArduinoData,  sendHtml.success) //сюда обращается сама ардуинка
//при посте новой записи, удаляем старые

//app.post("/chartsValues", handler.postArrays)



module.exports = app;
