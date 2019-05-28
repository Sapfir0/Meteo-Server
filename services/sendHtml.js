
const path = require('path')
const viewsDir = path.join(__dirname, "..", "views/")

const index = (req, res) => {
    res.sendFile(viewsDir + "index.html")
}

module.exports = {
    index
}

