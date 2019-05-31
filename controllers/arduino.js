//данные приходят в req.query
const arduinoAPI = require("../services/handleArduinoDatas")


function saveArduinoData(req, res, next) {
    arduinoAPI.writeArduinoValuesToSQL(req.query)
}

function getArduinoData(req, res, next) {
    let data;
    arduinoAPI.getLastArduinoValueFromSQL().then( (ard) => {
            data=ard.dataValues;
            return data;
        }).then( (data) => {
            console.log(data)
            return res.json(data)
        });
    
}

module.exports = {
    saveArduinoData,
    getArduinoData
}
