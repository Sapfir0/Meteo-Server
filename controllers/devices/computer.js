//данные приходят в req.query
const arduinoAPI = require("../../services/computerParams")
const userApi = require("../../services/user")

function saveComputerData(req, res, next) {
    // как много присвоений, как же это исправить хм
    const computerData = req.query;
    console.log(req)
    console.log(computerData)
    const HDD_temp = req.body.HDD_temp
    const CPU_temp =req.body.CPU_temp
    const CPU_currentLoad =req.body.CPU_currentLoad 
    const CPU_5minute_load =req.body.CPU_5minute_load
    const CPU_15minute_load =req.body.CPU_15minute_load
    const CPU_load_iostat =req.body.CPU_load_iostat
    const PC_id=req.body.PC_id
    
    arduinoAPI.writeComputerParams(HDD_temp, CPU_temp, 
        CPU_currentLoad, CPU_5minute_load, CPU_15minute_load,
        CPU_load_iostat, PC_id)

    next()
}

function updatePC_Id(req, res, next) {
    console.log(req.body)
    userApi.changePC_id(req.user.id, req.body.PC_id)
    next()
}
/////////////// когда допишу питон, доделаю

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
    saveComputerData,
    updatePC_Id
}
