const { MeteostationInside, MeteostationOutside } = require('../database/tables')

const { Op } = require('sequelize')
const {Sequelize} = require('sequelize')

function writeMeteostationInsideParams(temperatureH, humidityH, sansityH, meteostationId) {
    return MeteostationInside.create({
        temperatureH,
        humidityH,
        sansityH,
        meteostationId
    })
}

function writeMeteostationOutsideParams(temperature, humidity, pressure, 
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


async function getColumnMeteostationFromSQL(model, column, meteostationId)  { // вернет все значения у заданного столбца 
    //SELECT column FROM TABLE; // где meteostationId == meteostationId
    const currentColumn = await model.findAll({
        attributes: [column],
        where: {
            meteostationId
        }
    })
    //console.log(currentColumn)
    var temp=[]
    for(let i=0; i<currentColumn.length; i++) {
        temp.push(currentColumn[i].dataValues[`${column}`]) 
    }
    // console.log(temp)
    return temp;
}


function getLastMeteostationFromSQL(model, params) { 
    //SELECT * FROM tablename ORDER BY ID DESC LIMIT 1 
    console.log(model);
    
    return model.findOne({ 
        order: [
            ['id', 'DESC']
        ],
        where: {
            ...params
        },
        limit: 1
    })

}

function deleteOldMeteostationFromSQL(model, id, time=1000*60*60*12) {
    return model.destroy({
        where: {
            meteostationId: id,
            createdAt: {
                [Op.lt]: new Date( new Date() - time) //в микросекундах // 12ч
            }
        }
    })
}



module.exports = {
    writeMeteostationInsideParams,
    writeMeteostationOutsideParams,
    deleteOldMeteostationFromSQL,
    getColumnMeteostationFromSQL,
    getLastMeteostationFromSQL,

}