const userApi = require("../../services/user")

async function checkUserId(req, res, next) {
    if(req.user.id == undefined) {
        console.error("Да ты петух не авторизован, бан тебе")
        return res.json("Да ты петух не авторизован, бан тебе")
    }
    try {
        const meteoId = await userApi.getMeteoId(req.user.id)
        let string=[]
        if (meteoId.dataValues.meteostationId === undefined || meteoId.dataValues.meteostationId === null) {
            console.error("Не имеется метеоайди")
            string.push("Не имеется метеоайди")
        }
        console.log(meteoId.dataValues.meteostationId)

        const PC_Id = await userApi.getPC_Id(req.user.id)
        if (PC_Id.dataValues.PC_Id === undefined || PC_Id.dataValues.PC_Id === null) {
            console.error( "Не имеется pc айди")
            string.push("Не имеется pc айди")
        }
        console.log(PC_Id.dataValues.PC_Id)
        console.error(string)
        return res.json(string)
    }
    catch(error) {
        console.error("Ошибка тут", error)
    }
    console.error("Должен быть некст")
    next()
}

module.exports = {
    checkUserId
}