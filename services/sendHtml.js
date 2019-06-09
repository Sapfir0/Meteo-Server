
const config = require("../config/config")


const index = (req, res, next) => {
    res.sendFile(config.viewsDir + "index.html")
}

const success = (req, res) => {
    res.send("Успешно")
}

const sign_In = (req, res, next) => {
    res.sendFile(config.viewsDir + "sign_In.html")
}

const register = (req, res, next) => {
    res.sendFile(config.viewsDir + "register.html")
}

const datasPage = (req, res) => {
    res.sendFile(config.viewsDir + "datasPage.html")
}


module.exports = {
    index,
    success,
    register,
    sign_In,
    datasPage
}
