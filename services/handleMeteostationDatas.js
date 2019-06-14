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


async function getColumnMeteostationInsideFromSQL(column, meteostationId)  { // вернет все значения у заданного столбца 
    //SELECT column FROM TABLE; // где meteostationId == meteostationId
    const currentColumn = await MeteostationInside.findAll({
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

async function getColumnMeteostationOutsideFromSQL(column, meteostationId)  { // вернет все значения у заданного столбца 
    //SELECT column FROM TABLE; // где meteostationId == meteostationId
    const currentColumn = await MeteostationInside.findAll({
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


async function getMeteostationInsideParams(meteostationId) {
    return MeteostationInside.findOne({
        order: [
            ['id', 'DESC']
        ],
        where: {
            meteostationId
        },
        limit: 1
    })
}

async function getMeteostationOutsideParams(meteostationId) {
    return MeteostationOutside.findOne({
        order: [
            ['id', 'DESC']
        ],
        where: {
            meteostationId
        },
        limit: 1
    })
}

function getLastMeteostationInsideFromSQL(meteostationId) { 
    //SELECT * FROM tablename ORDER BY ID DESC LIMIT 1 
    return MeteostationInside.findOne({ 
        order: [
            ['id', 'DESC']
        ],
        where: {
            meteostationId
        },
        limit: 1
    })
}

function getLastMeteostationOutsideFromSQL(meteostationId) { 
    //SELECT * FROM tablename ORDER BY ID DESC LIMIT 1 
    return MeteostationOutside.findOne({ 
        order: [
            ['id', 'DESC']
        ],
        where: {
            meteostationId
        },
        limit: 1
    })

}

function deleteOldMeteostationOutsideFromSQL (meteostationId) {
    // "DELETE  FROM `table` WHERE created_at < (NOW() - INTERVAL 30 DAY)")
    return MeteostationOutside.destroy({
        where: {
            meteostationId,
            createdAt: {
                [Op.lt]: new Date( new Date() - 1000*60*60*12) //в микросекундах // 12ч
            }
        }
    })
}

function deleteOldMeteostationInsideFromSQL (meteostationId) {
    // "DELETE  FROM `table` WHERE created_at < (NOW() - INTERVAL 30 DAY)")
    return MeteostationInside.destroy({
        where: {
            meteostationId,
            createdAt: {
                [Op.lt]: new Date( new Date() - 1000*60*60*12) //в микросекундах // 12ч
            }
        }
    })
}



module.exports = {
    writeMeteostationInsideParams,
    writeMeteostationOutsideParams,
    deleteOldMeteostationInsideFromSQL,
    deleteOldMeteostationOutsideFromSQL,
    getColumnMeteostationInsideFromSQL,
    getColumnMeteostationOutsideFromSQL,
    getLastMeteostationInsideFromSQL,
    getLastMeteostationOutsideFromSQL,
    getMeteostationInsideParams,
    getMeteostationOutsideParams
}