//данные приходят в req.query
const arduinoAPI = require("../../services/handleMeteostationDatas")
const userApi = require("../../services/user")
const { MeteostationInside, MeteostationOutside } = require('../../database/tables')
const helper = require("../../services/helper")

function saveArduinoData(req, res, next) {
    // как много присвоений, как же это исправить хм
    const meteostationData = req.query;

    const temperatureInHome = meteostationData.temperatureInHome
    const humidityInHome = meteostationData.humidityInHome 
    const sansity = meteostationData.sansity 

    const temperature = meteostationData.temperature 
    const humidity = meteostationData.humidity 
    const pressure = meteostationData.pressure 
    const engWeatherDescription = meteostationData.engWeatherDescription 
    const weatherId = meteostationData.weatherId 
    const windSpeed =meteostationData.windSpeed 
    const windDeg= meteostationData.windDeg 
    const sunriseTime = meteostationData.sunriseTime
    const sunsetTime = meteostationData.sunsetTime
    const icon= meteostationData.icon 
    const meteostationId= meteostationData.meteostationId
    
    arduinoAPI.writeMeteostationInsideParams(temperatureInHome, humidityInHome, sansity, meteostationId)
    arduinoAPI.writeMeteostationOutsideParams(temperature, humidity, pressure, 
        engWeatherDescription, weatherId, windSpeed, windDeg, sunriseTime, sunsetTime, icon, meteostationId)
    // запросы выше можно делать параллельно
    next()
}

function updateMeteoId(req, res, next) {
    userApi.changeMeteoId(req.user.id, req.body.meteostationId)
    next()
}


function getArrays(req, res, next) {  
    
    const columnsInside = ["temperatureH", "humidityH", "createdAt" ]
    const columnsOutside = ["temperature", "humidity"]
    let finalJson= new Object;

    getter().then( (column) =>{
        return res.json(column)
    })

    async function getter() {
        const userId = req.user.meteostationId
        
        for(let i=0; i<columnsInside.length; i++) { //переписать это говнецо
            try {
                let item = await helper.getColumnDatasFromSQL(MeteostationInside, columnsInside[i], userId) // мы строим графики только по инсайду, на 
                finalJson[columnsInside[i]] = item
            }
            catch(error) {
                console.error("Meteostation column error")
            }
        }

        for(let i=0; i<columnsOutside.length; i++) {
            try {
                let item = await helper.getColumnDatasFromSQL(MeteostationOutside, columnsOutside[i], userId) // мы строим графики только по инсайду, на 
                finalJson[columnsOutside[i]] = item
            }
            catch(error) {
                console.error("Meteostation column error 2")
            }
        }

        return finalJson;
    }


}


async function getMeteostationData(req, res, next) {
    const userId = req.user.meteostationId
    if (userId == null || userId == undefined ) {
        return;
    }

    try {
        const inside = await helper.getLastDatasFromSQL(MeteostationInside,userId);
        const outside =  await helper.getLastDatasFromSQL(MeteostationOutside,userId);     
        Object.assign(inside.dataValues, outside.dataValues)
        
        return res.json(inside.dataValues)
    }
    catch(error) {
        console.error("Meteostation last data error")
    }
    next()
}


function deleteOldArticles(req,res,next) {
    //запрашиваю айди метеостанции
    const meteoId = req.query.meteostationId
    helper.deleteOldDatasFromSQL(MeteostationInside,meteoId)
    helper.deleteOldDatasFromSQL(MeteostationOutside,meteoId)
    next()
}

module.exports = {
    saveArduinoData,
    getMeteostationData,
    deleteOldArticles,
    getArrays,
    updateMeteoId
}
