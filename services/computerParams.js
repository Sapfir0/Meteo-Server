const { ComputerParams } = require('../database/tables')
const { Op } = require('sequelize')
const { AbstractDeviceAPI } = require("./(old)AbstarctDeviceAPI")

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



module.exports = {
    writeComputerParams,

}