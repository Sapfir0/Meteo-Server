const express = require('express');
const app = express.Router();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false})
const debug = require("../services/debug")

const sendHtml = require("../services/sendHtml")
const handler = require("../controllers/arduino")



//-------- рендер страниц -------------
app.get('/', sendHtml.index);


//---------- API ----------------------
app.get('/meteostationData', handler.getArduinoData) //сюда обращается клиент для получения инфы о датчиках 

app.post('/meteostationData',  debug.seeQuery, handler.deleteOldArticles, handler.saveArduinoData,  sendHtml.success) //сюда обращается сама ардуинка
//при посте новой записи, удаляем старые

app.get("/chartsValues", handler.getArrays) //для построения графиков



module.exports = app;
