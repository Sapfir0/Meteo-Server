//данные приходят в req.query
const arduinoAPI = require("../../services/computerParams")
const userApi = require("../../services/user")

function saveArduinoData(req, res, next) {
    // как много присвоений, как же это исправить хм
    const computerData = req.query;
    console.log(computerData)
    
    
    //arduinoAPI.writeComputerParams()

    next()
}

function updateMeteoId(req, res, next) {
    console.log(req.body)
    userApi.changePC_id(req.user.id, req.body.PC_id)
    next()
}


// function getArrays(req, res, next) {  
    
//     const columns = ["temperature", "humidity", "createdAt" ]
    
//     let finalJson= new Object;

//     // const column = await helper();
//     // return res.json(column)

//     helper().then( (column) =>{
//         return res.json(column)
//     })


//     //переписать код выше на авейты

//     async function helper() {
//         const userId = req.user.meteostationId

//         for(let i=0; i<columns.length; i++) {
//             let item = await arduinoAPI.getColumnMeteostationInsideFromSQL(columns[i], userId) // мы строим графики только по инсайду, на 
//             finalJson[columns[i]] = item
//         }
//         return finalJson;
//     }


// }


// async function getArduinoData(req, res, next) {
//     const userId = req.user.meteostationId
//     if (userId == null || userId == undefined ) {
//         return;
//     }

//     try {
//         const ard = await arduinoAPI.getLastMeteostationInsideFromSQL(userId);
//         return res.json(ard.dataValues)
//     }
//     catch(error) {
//         console.error(error)
//     }

// }

// function deleteOldArticles(req,res,next) {
//     //запрашиваю айди метеостанции
//     const meteoId = req.query.meteostationId
//     arduinoAPI.deleteOldMeteostationInsideFromSQL(meteoId)
//     arduinoAPI.deleteOldMeteostationOutsideFromSQL(meteoId)
//     next()
// }

module.exports = {
    saveArduinoData,

}
