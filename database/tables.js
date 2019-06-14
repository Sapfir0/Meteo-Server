const models = require('./models');

const User = models.users
const MeteostationInside = models.meteostationInside
const MeteostationOutside = models.meteostationOutside
const Meteostation = models.meteostation
const ComputerParams = models.computerParams

module.exports = {
    User, 
    MeteostationOutside,
    MeteostationInside,
    Meteostation,
    ComputerParams
}