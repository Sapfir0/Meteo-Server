
const config = require("../config/config")


const index = (req, res) => {
    res.sendFile(config.viewsDir + "index.html")
}

module.exports = {
    index
}

