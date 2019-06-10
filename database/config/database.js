require('dotenv').config(); // this is important!
module.exports = 
{
    "development": {
        "username": process.env.USERNAME,
        "password": process.env.PASSWORD,
        "database": process.env.DATABASE,
        "host": process.env.HOST,
        "dialect": "mysql"
    },
    "test": {
        "username": " ",
        "password": " ",
        "database": " ",
        "host": " ",
        "dialect": " ",
        "logging": true
    },
    "production": {
        "username": process.env.USERNAME,
        "password": process.env.PASSWORD,
        "database": process.env.DATABASE,
        "host": process.env.HOST,
        "dialect": "mysql",
        "logging": false
    }
}
