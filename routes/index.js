const express = require('express');
const app = express.Router();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false})

const sendHtml = require("../services/sendHtml")
const arduino = require("../services/handleArduinoDatas")


app.get('/', sendHtml.index);

app.post('/arduinoData', urlencodedParser, arduino.getArduinoValues)


module.exports = app;
