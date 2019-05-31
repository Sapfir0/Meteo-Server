const arduinoInit = require('../database/models/arduino')
const models = require('../database/models');
const Arduino = arduinoInit(models.sequelize, models.Sequelize)

const writeArduinoValuesToSQL = (req,res,next) => {
    console.log(req.query)
    const values = req.query;
    //ВАЖНО, надо учитывать про все эти поля на ардуинке
    return Arduino.create({
        temperatureInHome: values.temperatureInHome,
        humidityInHome: values.humidityInHome,
        temperature: values.temperature,
        humidity: values.humidity,
        pressure: values.pressure,
        weatherDescription: values.weatherDescription,
        arduinoTimestamp: values.CURRENTTIMESTAMP
    })
}


const readArduinoValuesFromSQL = (req,res,next) => {

}

function getLastArduinoValueFromSQL() { 
    //SELECT * FROM tablename ORDER BY ID DESC LIMIT 1 
    await sequelize.models.posts.findOne({
        order: [
            ['id', 'DESC']
        ],
        limit: 1
    })
}

function deleteOldArduinoValuesFromSQL () {
    //да, айдишники у нас скоро вырастут до бесконечности, т.к. мы удаляем старые записи по айдишнику
    //думаю, жто неверно и нужно переписать по дате
    return Arduino.destroy({
        order: [
            ['id', 'DESC']
        ],
        limit: 1
    })
}


module.exports = {
    writeArduinoValuesToSQL
}