const path = require('path')

const port = process.env.PORT || 5060;

const mainDir = path.join(__dirname, "..")
const viewsDir = path.join(__dirname, "..", "views/") //я уже забыл зачем тут слеш
const imgDir = path.join(__dirname, "..", 'public', 'img') 


module.exports = {
    port,
    mainDir,
    viewsDir,
    imgDir
};