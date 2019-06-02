//данные приходят в req.query
const arduinoAPI = require("../services/handleArduinoDatas")


function saveArduinoData(req, res, next) {
    arduinoAPI.writeArduinoValuesToSQL(req.query)
    next()
}

function postArrays(req, res, next) {  
    const columns = ["temperatureInHome", "humidityInHome", "temperature",
    "humidity", "pressure", "weatherDescription", "arduinoTimestamp" ]
    var finalJson=[]
    for(let i in columns) {
        arduinoAPI.getColumnArduinoFromSQL(columns[i]).then( (obj) => { //тут было бы неплохо проверять столбце на существование
            finalJson.push(obj)
        })
    }
    return res.json(finalJson);
}

function getArduinoData(req, res, next) {

    arduinoAPI.getLastArduinoValueFromSQL().then( (ard) => {
            const data=ard.dataValues;
            return data;
        }).then( (data) => {
            //console.log(data)
            return res.json(data)
        });
    
}

function deleteOldArticles(req,res,next) {
    arduinoAPI.deleteOldArduinoValuesFromSQL()
    next()
}

module.exports = {
    saveArduinoData,
    getArduinoData,
    deleteOldArticles,
    postArrays
}
