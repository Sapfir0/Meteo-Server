const { MeteostationInside, MeteostationOutside } = require('../database/tables')

const { Op } = require('sequelize')
const {Sequelize} = require('sequelize')

function writeInsideMeteostationParams(temperature, humidity, sansity, meteostationId) {
    return MeteostationInside.create({
        temperature,
        humidity,
        sansity,
        meteostationId
    })
}

function writeOutsideMeteostationParams(temperature, humidity, pressure, 
    engWeatherDescription, weatherId, windSpeed, windDeg, icon, meteostationId) {
    
    return MeteostationOutside.create({
        temperature,
        humidity,
        pressure,
        engWeatherDescription,
        weatherId,
        windSpeed,
        windDeg,
        icon,
        meteostationId
    })
}



function getFields(table) {
    //SHOW FIELDS FROM $table
    return [`${table}`].findAll({
        
    })
}


async function getColumnArduinoFromSQL(column, meteostationId)  { // вернет все значения у заданного столбца 
    //SELECT column FROM TABLE; // где meteostationId == meteostationId
        //запрос обновился
    const currentColumn = await MeteostationInside.findAll({
        include:[{
            model: MeteostationOutside,
            where: {
                meteostationId: {
                    Sequelize.col('meteostationId') //чет этот блок не работает именно здесь
                } 
            }
        }],
        attributes: [column],
        where: {
            meteostationId
        }
    })
    console.log(currentColumn)
    var temp=[]
    for(let i=0; i<currentColumn.length; i++) {
        temp.push(currentColumn[i].dataValues[`${column}`]) 
    }
    // console.log(temp)
    return temp;
}

function getLastArduinoValueFromSQL(meteostationId) { 
    //SELECT * FROM tablename ORDER BY ID DESC LIMIT 1 

    return Meteostation.findOne({ 
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
    return Meteostation.destroy({
        where: {
            meteostationId,
            createdAt: {
                [Op.lt]: new Date( new Date() - 1000*60*60*12) //в микросекундах // 12ч
            }
        }
    })
}


module.exports = {
    //writeArduinoValuesToSQL,
    getColumnArduinoFromSQL,
    getLastArduinoValueFromSQL,
    deleteOldArduinoValuesFromSQL,
    writeInsideMeteostationParams,
    writeOutsideMeteostationParams
}