
const config = require("../config/config")


const index = (req, res, next) => {
    res.sendFile(config.viewsDir + "index.html")
}

const success = (req, res) => {
    res.send("Успешно")
}

module.exports = {
    index,
    success
}

