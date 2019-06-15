//данные приходят в req.query
const computerAPI = require("../../services/computerParams")
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
    
    computerAPI.writeComputerParams(HDD_temp, CPU_temp, 
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

function getArrays(req, res, next) {  
    
    const columns = ["CPU_load_iostat", "CPU_temp", "createdAt" ]
    
    let finalJson= new Object;

    helper().then( (column) =>{
        return res.json(column)
    })

    //переписать код выше на авейты

    async function helper() {
        const userId = req.user.PC_Id

        for(let i=0; i<columns.length; i++) {
            let item = await computerAPI.getColumnMeteostationInsideFromSQL(columns[i], userId) // мы строим графики только по инсайду, на 
            finalJson[columns[i]] = item
        }
        return finalJson;
    }


}

async function getComputerData(req, res, next) {
    const userId = req.user.PC_Id
    if (userId == null || userId == undefined ) {
        return;
    }

    try {
        const ard = await computerAPI.getLastMeteostationInsideFromSQL(userId);
        console.log(ard.dataValues)
        return res.json(ard.dataValues)
    }
    catch(error) {
        console.error("Computer last data error")
    }

}

function deleteOldDatas(req,res,next) {
    const PC_Id = req.query.PC_Id
    computerAPI.deleteOldComputerParams(PC_Id)
    next()
}

module.exports = {
    saveComputerData,
    updatePC_Id,
    getArrays,
    deleteOldDatas,
    getComputerData
}
