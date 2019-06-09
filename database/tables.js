const models = require('./models');


const User = models.users
const Arduino = models.arduino

module.exports = {
    User, 
    Arduino
}