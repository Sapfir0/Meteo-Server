const { Op } = require('sequelize')

var AbstractDeviceAPI = function () {

};


AbstractDeviceAPI.prototype.writeDeviceParams = function(dbPointer, args) {
    let realArgs=[]
    for(let i=0; i<arguments.length; i++) {
        realArgs[i]=arguments[i]
    }
    dbPointer.create({ // да и мб это тоже надо обрачивать
        realArgs //очень не уверен, что переданный сюда массив добавит все его элементы в бд
    })
}

AbstractDeviceAPI.prototype.getLastDeviceParams = function(dbPointer, deviceId) {
    console.log(deviceId)
    return dbPointer.findOne({
        order: [
            ['id', 'DESC']
        ],
        where: {
            deviceId // ? н уверен что будет работать
        },
        limit: 1
    })
}


AbstractDeviceAPI.prototype.deleteOldDeviceParams = function(dbPointer, deviceId) {
    // "DELETE  FROM `table` WHERE created_at < (NOW() - INTERVAL 12 HOURS)")
    return dbPointer.destroy({
        where: {
            deviceId, // ?
            createdAt: {
                [Op.lt]: new Date( new Date() - 1000*60*60*12) //в микросекундах // 12ч
            }
        }
    })
}

AbstractDeviceAPI.prototype.getColumnDeviceParams = function(dbPointer, column, deviceId) {// вернет все значения у заданного столбца 
    //метод должен быть асигн
    const currentColumn = await dbPointer.findAll({
        attributes: [column],
        where: {
            deviceId
        }
    })
    console.log(currentColumn)
    var temp=[]
    
    for(let i=0; i<currentColumn.length; i++) {
        temp.push(currentColumn[i].dataValues[`${column}`]) 
    }
    return temp;
}

