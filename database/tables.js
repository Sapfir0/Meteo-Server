const models = require("./models");

const User = models.users
const MeteostationInside = models.meteostationInside
const MeteostationOutside = models.meteostationOutside
const Meteostation = models.meteostation
const Profle = models.profles
const Push = models.pushSchemas

module.exports = {
    User, 
    MeteostationOutside,
    MeteostationInside,
    Meteostation,
    Profle,
    Push
}