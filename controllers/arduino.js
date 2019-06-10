//данные приходят в req.query
const arduinoAPI = require("../services/handleArduinoDatas")
const userApi = require("../services/user")

function saveArduinoData(req, res, next) {
    //console.log(req.query)
    arduinoAPI.writeArduinoValuesToSQL(req.query)
    next()
}

function updateMeteoId(req, res, next) {
    console.log(req.body)
    userApi.changeMeteoId(req.user.id, req.body.meteostationId)
    next()
}


function getArrays(req, res, next) {  
    
    const columns = ["temperatureInHome", "humidityInHome", 
     "createdAt" ]
    
    let finalJson= new Object;

    // const column = await helper();
    // return res.json(column)

    helper().then( (column) =>{
        return res.json(column)
    })


    //переписать код выше на авейты

    async function helper() {
        const meteoId = req.user.meteostationId;

        for(let i=0; i<columns.length; i++) {
            let item = await arduinoAPI.getColumnArduinoFromSQL(columns[i], meteoId)
            finalJson[columns[i]] = item
        }
        return finalJson;
    }


}


async function getArduinoData(req, res, next) {
    console.log(req.user)

    try {
        const meteoId = req.user.meteostationId;
        const ard = await arduinoAPI.getLastArduinoValueFromSQL(meteoId);
        return res.json(ard.dataValues)
    }
    catch(error) {
        console.error(error)
    }
}

function deleteOldArticles(req,res,next) {
    //запросить айди метеостанции
    console.log(req.user)
    const meteoId = req.user.meteostationId;
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
