const { Op } = require('sequelize')

class AbstractDeviceAPI {
    constructor(dbPointer) {
        this.dbPointer = dbPointer
    }

    writeDeviceParams(args) {
        let realArgs=[]
        for(let i=0; i<arguments.length; i++) {
            realArgs[i]=arguments[i]
        }
        console.log(arguments)
        
        this.dbPointer.create({ // да и мб это тоже надо обрачивать
            realArgs //очень не уверен, что переданный сюда массив добавит все его элементы в бд
        })
    }

    getLastDeviceParams(typeOfId, deviceId) { // строка вроде meteoId, сама эта переменная(извлчем значнеие тут)
        console.log([`${typeOfId}`])
        console.log([`${deviceId}`])
        console.log(`${this.dbPointer}`)
        
        return `${this.dbPointer}`.findOne({
            order: [
                ['id', 'DESC']
            ],
            where: {
                [`${typeOfId}`] : deviceId // ? не уверен что будет работать
            },
            limit: 1
        })
    }

    deleteOldDeviceParams(deviceId) {
        // "DELETE  FROM `table` WHERE created_at < (NOW() - INTERVAL 12 HOURS)")
        return `${this.dbPointer}`.destroy({
            where: {
                deviceId, // ?
                createdAt: {
                    [Op.lt]: new Date( new Date() - 1000*60*60*12) //в микросекундах // 12ч
                }
            }
        })
    }

    getColumnDeviceParams(column, typeOfId, deviceId) {// вернет все значения у заданного столбца 
        //метод должен быть асигн
        const currentColumn = await `${this.dbPointer}`.findAll({
            attributes: [column],
            where: {
                [`${typeOfId}`] : deviceId 
            }
        })
        console.log(currentColumn)
        var temp=[]
        
        for(let i=0; i<currentColumn.length; i++) {
            temp.push(currentColumn[i].dataValues[`${column}`]) 
        }
        return temp;
    }

}

module.exports = {
    AbstractDeviceAPI
}






