const models = require('./models');

const User = models.users
const MeteostationInside = models.meteostationInside
const MeteostationOutside = models.meteostationOutside
const Meteostation = models.meteostation

module.exports = {
    User, 
    MeteostationOutside,
    MeteostationInside
}