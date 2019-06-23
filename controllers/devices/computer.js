const computerAPI = require("../../services/computerParams")
const userApi = require("../../services/user")
const { ComputerParams } = require("../../database/tables")
const helper = require("../../services/helper")

function saveComputerData(req, res, next) {
    // как много присвоений, как же это исправить хм
    const HDD_temp = req.body.HDD_temp
    const CPU_temp =req.body.CPU_temp
    const CPU_currentLoad =req.body.CPU_currentLoad 
    const CPU_5minute_load =req.body.CPU_5minute_load
    const CPU_15minute_load =req.body.CPU_15minute_load
    const CPU_load_iostat =req.body.CPU_load_iostat
    const PC_Id=req.body.PC_Id
    
    computerAPI.writeComputerParams(HDD_temp, CPU_temp, 
        CPU_currentLoad, CPU_5minute_load, CPU_15minute_load,
        CPU_load_iostat, PC_Id)

    next()
}

function updatePC_Id(req, res, next) {
    userApi.changePC_id(req.user.id, req.body.PC_Id)
    next()
}


function getArrays(req, res) {  
    
    const columns = ["CPU_load_iostat", "CPU_temp", "createdAt" ]
    
    let finalJson= new Object;

    getter().then( (column) =>{
        return res.json(column)
    })


    async function getter() {
        const userId = req.user.PC_Id

        for(let i=0; i<columns.length; i++) {
            let item = await helper.getColumnDatasFromSQL(ComputerParams, columns[i], userId) 
            finalJson[columns[i]] = item
        }
        return finalJson;
    }


}


async function getComputerData(req, res) {
    const userId = req.user.PC_Id
    if (userId == null || userId == undefined ) {
        return;
    }

    try {
        const comp = await helper.getLastDatasFromSQL(ComputerParams, userId);
        return res.json(comp.dataValues)
    }
    catch(error) {
        console.error("Computer last data error")
    }

}

function deleteOldDatas(req,res,next) {
    const PC_Id = req.body.PC_Id
    helper.deleteOldDatasFromSQL(ComputerParams, PC_Id, 1000*60*60)
    next()
}

module.exports = {
    saveComputerData,
    updatePC_Id,
    getArrays,
    deleteOldDatas,
    getComputerData
}