//данные приходят в req.query
const arduinoAPI = require("../services/handleArduinoDatas")


function saveArduinoData(req, res, next) {
    console.log(req.query)
    arduinoAPI.writeArduinoValuesToSQL(req.query)
    next()
}

function getArrays(req, res, next) {  
    
    const columns = ["temperatureInHome", "humidityInHome", "temperature",
    "humidity", "pressure", "weatherDescription", "arduinoTimestamp", "createdAt" ]
    let finalJson=[]

    helper().then( (column) =>{
        return res.json(column)
    })

    async function helper() {
        for(let i=0; i<columns.length; i++) {
            let item = await arduinoAPI.getColumnArduinoFromSQL(columns[i])
            finalJson.push(item)
        }
        return finalJson;
    }


}


async function getArduinoData(req, res, next) {
    try {
        const ard = await arduinoAPI.getLastArduinoValueFromSQL();
        console.log(ard)
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
