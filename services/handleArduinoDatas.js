const arduinoInit = require('../database/models/arduino')
const models = require('../database/models');
const Arduino = arduinoInit(models.sequelize, models.Sequelize)

const Op = Sequelize.Op;


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
    // "DELETE  FROM `table` WHERE created_at < (NOW() - INTERVAL 30 DAY)")
    return Arduino.destroy({
        where: {
            created_at: {
                [Op.lt]: new Date( Sequelize.NOW - 24 * 60 * 60 * 30 ) 
            }
        }
    })
}


module.exports = {
    writeArduinoValuesToSQL,
    readArduinoValuesFromSQL,
    getLastArduinoValueFromSQL,
    deleteOldArduinoValuesFromSQL
}