const userApi = require("../../services/user")

async function checkUserId(req, res, next) {
    if(req.user.id == undefined) {
        return res.json("Да ты петух не авторизован, бан тебе")
    }
    try {
        const meteoId = req.user.meteostationId
        const PC_Id = req.user.PC_Id
        let errors=[]

        if (meteoId === undefined || meteoId === null) {
            errors.push("521") // я хочу чтобы остутствие метеостанции было кодом 521(учтем это на фронте)
        }
        if (PC_Id === undefined || PC_Id === null) {
            errors.push("522")
        }
        console.error(!!(errors.length === 0))
        //throw new Error(errors)
        if( !errors) //если она не пустая
            return res.json(errors)
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