const models = require('./models');

const User = models.users
const MeteostationInside = models.meteostationInside
const MeteostationOutside = models.meteostationOutside

module.exports = {
    User, 
    MeteostationOutside,
    MeteostationInside
}