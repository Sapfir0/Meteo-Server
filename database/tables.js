const models = require('./models');


const User = models.users
const Meteostation = models.meteostation

module.exports = {
    User, 
    Meteostation
}