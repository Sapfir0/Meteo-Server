const { AbstractDeviceAPI } = require("./(old)AbstractDeviceAPI")

class ComputerAPI extends AbstractDeviceAPI {
    constructor() {
        var dbPointer = "ComputerParams" 
        super(dbPointer)
        
    }
    writeDeviceParams(dbPointer, HDD_temp, CPU_temp, CPU_currentLoad,CPU_5minute_load, 
        CPU_15minute_load, CPU_load_iostat, PC_Id) {

            super.writeDeviceParams(dbPointer, HDD_temp, CPU_temp, CPU_currentLoad,CPU_5minute_load, 
                CPU_15minute_load, CPU_load_iostat, PC_Id)

    }

    deleteOldDeviceParams(PC_Id) {
        super.deleteOldDeviceParams(PC_Id)
    }




}


module.exports = {
    ComputerAPI
}

