const { ComputerParams } = require('../database/tables')


function writeComputerParams(HDD_temp, CPU_temp, CPU_currentLoad,
    CPU_5minute_load, CPU_15minute_load, CPU_load_iostat, unused_RAM, 
    GPU_temp, GPU_load, PC_Id) {

    return ComputerParams.create({
        HDD_temp, 
        CPU_temp, 
        CPU_currentLoad,
        CPU_5minute_load, 
        CPU_15minute_load, 
        CPU_load_iostat,
        unused_RAM, 
        GPU_temp,
        GPU_load,
        PC_Id
    })
}

function getComputerParams(PC_Id) {
    return ComputerParams.findOne({
        order: [
            ['id', 'DESC']
        ],
        where: {
            PC_Id
        },
        limit: 1
    })
}

async function getColumnComputerParams(column, PC_Id)  { // вернет все значения у заданного столбца 
    const currentColumn = await ComputerParams.findAll({
        attributes: [column],
        where: {
            PC_Id
        }
    })
    console.log(currentColumn)

    var temp=[]
    for(let i=0; i<currentColumn.length; i++) {
        temp.push(currentColumn[i].dataValues[`${column}`]) 
    }
    return temp;
}


module.exports = {
    writeComputerParams,
    getComputerParams,
    getColumnComputerParams
}