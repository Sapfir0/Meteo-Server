const arduinoInit = require('../database/models/arduino')
const models = require('../database/models');
const Arduino = arduinoInit(models.sequelize, models.Sequelize)

const { Op } = require('sequelize')

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

async function getColumnArduinoFromSQL(column)  { // вернет все значения у заданного столбца 
    //SELECT column FROM TABLE;
    
    const currentColumn = await Arduino.findAll({
        attributes: [column]
    })

    var temp=[]
    for(let i=0; i<currentColumn.length; i++) {
        temp.push(currentColumn[i].dataValues[`${column}`]) 
    }
    // console.log(temp)
    return temp;
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
            createdAt: {
                [Op.lt]: new Date( new Date() - 1000*60*60*12) //в микросекундах // 12ч
            }
        }
    })
}


module.exports = {
    writeArduinoValuesToSQL,
    getColumnArduinoFromSQL,
    getLastArduinoValueFromSQL,
    deleteOldArduinoValuesFromSQL
}