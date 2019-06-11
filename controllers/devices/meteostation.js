//данные приходят в req.query
const arduinoAPI = require("../../services/handleMeteostationDatas")
const userApi = require("../../services/user")

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
    const icon= meteostationData.icon 
    const meteostationId= meteostationData.meteostationId
    
    arduinoAPI.writeInsideMeteostationParams(temperatureInHome, humidityInHome, sansity, meteostationId)
    arduinoAPI.writeOutsideMeteostationParams(temperature, humidity, pressure, 
        engWeatherDescription, weatherId, windSpeed, windDeg, icon, meteostationId)
    // запросы выше можно делать параллельно
    next()
}

function updateMeteoId(req, res, next) {
    console.log(req.body)
    userApi.changeMeteoId(req.user.id, req.body.meteostationId)
    next()
}


function getArrays(req, res, next) {  
    
    const columns = ["temperatureInHome", "humidityInHome", "createdAt" ]
    
    let finalJson= new Object;

    // const column = await helper();
    // return res.json(column)

    helper().then( (column) =>{
        return res.json(column)
    })


    //переписать код выше на авейты

    async function helper() {
        const userId = req.user.meteostationId

        for(let i=0; i<columns.length; i++) {
            let item = await arduinoAPI.getColumnArduinoFromSQL(columns[i], userId)
            finalJson[columns[i]] = item
        }
        return finalJson;
    }


}


async function getArduinoData(req, res, next) {
    const userId = req.user.meteostationId
    if (userId == null || userId == undefined ) {
        return;
    }

    try {
        const ard = await arduinoAPI.getLastArduinoValueFromSQL(userId);
        return res.json(ard.dataValues)
    }
    catch(error) {
        console.error(error)
    }
}

function deleteOldArticles(req,res,next) {
    //запрашиваю айди метеостанции
    const meteoId = req.query.meteostationId
    console.log(meteoId)
    arduinoAPI.deleteOldArduinoValuesFromSQL(meteoId)
    next()
}

module.exports = {
    saveArduinoData,
    getArduinoData,
    deleteOldArticles,
    getArrays,
    updateMeteoId
}
