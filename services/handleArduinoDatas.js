const { Arduino } = require("../database/tables")
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
        engWeatherDescription: arduinoData.engWeatherDescription,
        arduinoTimestamp: arduinoData.CURRENTTIMESTAMP,
        sansity: arduinoData.sansity,
        weatherId: arduinoData.weatherId,
        windSpeed:arduinoData.windSpeed,
        windDeg: arduinoData.windDeg,
        icon: arduinoData.icon,
        meteostationId: arduinoData.meteostationId
    })
}

function getFields(table) {
    //SHOW FIELDS FROM $table
    return [`${table}`].findAll({
        
    })
}


async function getColumnArduinoFromSQL(column, meteostationId)  { // вернет все значения у заданного столбца 
    //SELECT column FROM TABLE; // где meteostationId == meteostationId
    
    const currentColumn = await Arduino.findAll({
        attributes: [column],
        where: {
            meteostationId
        }
    })

    var temp=[]
    for(let i=0; i<currentColumn.length; i++) {
        temp.push(currentColumn[i].dataValues[`${column}`]) 
    }
    // console.log(temp)
    return temp;
}

function getLastArduinoValueFromSQL(meteostationId) { 
    //SELECT * FROM tablename ORDER BY ID DESC LIMIT 1 

    return Arduino.findOne({ 
        order: [
            ['id', 'DESC']
        ],
        where: {
            meteostationId
        },
        limit: 1
    })

}

function deleteOldArduinoValuesFromSQL (meteostationId) {
    // "DELETE  FROM `table` WHERE created_at < (NOW() - INTERVAL 30 DAY)")
    return Arduino.destroy({
        where: {
            meteostationId,
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