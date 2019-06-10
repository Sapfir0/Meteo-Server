//данные приходят в req.query
const arduinoAPI = require("../services/handleArduinoDatas")
const userApi = require("../services/user")

function saveArduinoData(req, res, next) {
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
        const userId = req.user.meteostationId

        for(let i=0; i<columns.length; i++) {
            let item = await arduinoAPI.getColumnArduinoFromSQL(columns[i], userId)
            finalJson[columns[i]] = item
        }
        return finalJson;
    }


}


async function getArduinoData(req, res, next) {
    console.log(req.user)

    try {
        const userId = req.user.meteostationId
        const ard = await arduinoAPI.getLastArduinoValueFromSQL(userId);
        return res.json(ard.dataValues)
    }
    catch(error) {
        console.error(error)
    }
}

function deleteOldArticles(req,res,next) {
    //запросить айди метеостанции
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
