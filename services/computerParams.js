const { ComputerParams } = require('../database/tables')


function writeComputerParams(hddTemp, CPUtemp, CPUcurLoad,CPU5min, 
    CPU15minLoad, CPUloadIostat,unusedRAM, GPUtemp, GPUload, PC_Id) {
    
    return ComputerParams.create({
        HDD_temp: hddTemp, 
        CPU_temp: CPUtemp, 
        CPU_currentLoad: CPUcurLoad,
        CPU_5minute_load: CPU5min, 
        CPU_15minute_load: CPU15minLoad, 
        CPU_load_iostat: CPUloadIostat,
        unused_RAM: unusedRAM, 
        GPU_temp: GPUtemp,
        GPU_load: GPUload,
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