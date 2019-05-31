const arduinoInit = require('../database/models/arduino')
const models = require('../database/models');
const Arduino = arduinoInit(models.sequelize, models.Sequelize)

function  writeArduinoValuesToSQL(arduinoData) {
    console.log(arduinoData)
    //ВАЖНО, надо учитывать все эти поля на ардуинке
    return Arduino.create({
        temperatureInHome: arduinoData.temperatureInHome,
        humidityInHome: arduinoData.humidityInHome,
        temperature: arduinoData.temperature,
        humidity: arduinoData.humidity,
        pressure: arduinoData.pressure,
        weatherDescription: arduinoData.weatherDescription,
        arduinoTimestamp: arduinoData.CURRENTTIMESTAMP
    })
}

function readArduinoValuesFromSQL()  {

}

function getLastArduinoValueFromSQL() { 
    //SELECT * FROM tablename ORDER BY ID DESC LIMIT 1 

    return Arduino.findOne({ 
        order: [
            ['id', 'DESC']
        ],
        limit: 1
    })

}

function deleteOldArduinoValuesFromSQL () {
    //да, айдишники у нас скоро вырастут до бесконечности, т.к. мы удаляем старые записи по айдишнику
    //думаю, это неверно и нужно переписать по дате
    return Arduino.destroy({
        order: [
            ['id', 'DESC']
        ],
        limit: 1
    })
}


module.exports = {
    writeArduinoValuesToSQL,
    readArduinoValuesFromSQL,
    getLastArduinoValueFromSQL,
    deleteOldArduinoValuesFromSQL
}