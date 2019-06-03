//данные приходят в req.query
const arduinoAPI = require("../services/handleArduinoDatas")


function saveArduinoData(req, res, next) {
    arduinoAPI.writeArduinoValuesToSQL(req.query)
    next()
}

function getArrays(req, res, next) {  
    
    const columns = ["temperatureInHome", "humidityInHome", "temperature",
    "humidity", "pressure", "weatherDescription", "arduinoTimestamp", "createdAt" ]
    let finalJson=[]
    for(let i=0; i<columns.length; i++) {
        arduinoAPI.getColumnArduinoFromSQL(columns[i]).then( (obj) => { //тут было бы неплохо проверять столбце на существование
            finalJson.push(obj)
            if(columns.length - i == 1) { //надо написать асинк функцию а не этот кал
                return res.json(finalJson);
            }
        })
    }

}


async function getArduinoData(req, res, next) {

    const ard = await arduinoAPI.getLastArduinoValueFromSQL();
    return res.json(ard.dataValues)
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
