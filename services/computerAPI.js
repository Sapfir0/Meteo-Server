const { AbstractDeviceAPI } = require("./AbstaractDeviceAPI")

class ComputerAPI extends AbstractDeviceAPI {
    constructor() {
        var dbPointer = "ComputerParams" 
        super(dbPointer)
    }
    writeDeviceParams(HDD_temp, CPU_temp, CPU_currentLoad,CPU_5minute_load, 
        CPU_15minute_load, CPU_load_iostat, PC_Id);


}


module.exports = {
    ComputerAPI
}

