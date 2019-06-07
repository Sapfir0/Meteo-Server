//данные приходят в req.query
const arduinoAPI = require("../services/handleArduinoDatas")


function saveArduinoData(req, res, next) {
    console.log(req.query)
    arduinoAPI.writeArduinoValuesToSQL(req.query)
    next()
}


function getArrays(req, res, next) {  
    
    const columns = ["temperatureInHome", "humidityInHome", "temperature",
    "humidity", "pressure", "engWeatherDescription", "arduinoTimestamp", "createdAt" ]
    


    let finalJson= new Object;

    helper().then( (column) =>{
        return res.json(column)
    })

    //переписать код выше на авейты

    async function helper() {
        for(let i=0; i<columns.length; i++) {
            let item = await arduinoAPI.getColumnArduinoFromSQL(columns[i])
            finalJson[columns[i]] = item
        }
        return finalJson;
    }


}


async function getArduinoData(req, res, next) {
    try {
        const ard = await arduinoAPI.getLastArduinoValueFromSQL();
        return res.json(ard.dataValues)
    }
    catch(error) {
        console.error(error)
    }
}

function deleteOldArticles(req,res,next) {
    arduinoAPI.deleteOldArduinoValuesFromSQL()
    next()
}

module.exports = {
    saveArduinoData,
    getArduinoData,
    deleteOldArticles,
    getArrays
}
