const { ComputerParams } = require('../database/tables')
const { Op } = require('sequelize')


function writeComputerParams(HDD_temp, CPU_temp, CPU_currentLoad,
    CPU_5minute_load, CPU_15minute_load, CPU_load_iostat, PC_Id ,  //unused_RAM, GPU_temp, GPU_load
    ) {

    return ComputerParams.create({
        HDD_temp, 
        CPU_temp, 
        CPU_currentLoad,
        CPU_5minute_load, 
        CPU_15minute_load, 
        CPU_load_iostat,
        PC_Id
        // unused_RAM, 
        // GPU_temp,
        // GPU_load
    })
}

function getComputerParams(PC_Id) {
    console.log(PC_Id)
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


function deleteOldComputerParams(PC_Id) {
    // "DELETE  FROM `table` WHERE created_at < (NOW() - INTERVAL 30 DAY)")
    return  ComputerParams.destroy({
        where: {
            PC_Id,
            createdAt: {
                [Op.lt]: new Date( new Date() - 1000*60*60*12) //в микросекундах // 12ч
            }
        }
    })
}


module.exports = {
    writeComputerParams,
    getComputerParams,
    getColumnComputerParams,
    deleteOldComputerParams
}