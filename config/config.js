const dotenv = require("dotenv")

if (process.env.NODE_ENV !== 'production') {
    dotenv.load()
}

const path = require('path')
const port = process.env.PORT;

const mainDir = path.join(__dirname, "..")
const viewsDir = path.join(__dirname, "..", "views/") //я уже забыл зачем тут слеш
const imgDir = path.join(__dirname, "..", 'public', 'img') 

const secretKey = process.env.SECRET_KEY 


module.exports = {
    port,
    mainDir,
    viewsDir,
    imgDir,
    secretKey

};