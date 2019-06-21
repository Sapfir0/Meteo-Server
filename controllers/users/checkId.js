const userApi = require("../../services/user")

async function checkUserId(req, res, next) {
    if(req.user.id == undefined) {
        return res.json("Да ты петух не авторизован, бан тебе")
    }
    try {
        const meteoId = await userApi.getMeteoId(req.user.id)
        let string=[]
        if (meteoId.dataValues.meteostationId === undefined || meteoId.dataValues.meteostationId === null) {
            string.push("521") // я хочу чтобы остутствие метеостанции было кодом 521(учтем это на фронте)
        }
        console.log(meteoId.dataValues.meteostationId)

        const PC_Id = await userApi.getPC_Id(req.user.id)
        if (PC_Id.dataValues.PC_Id === undefined || PC_Id.dataValues.PC_Id === null) {
            string.push("522")
        }
        console.error(string)
        //throw new Error(string)
        if( !string) //если она не пустая
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