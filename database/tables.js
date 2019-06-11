const models = require('./models');

const meteostationInside = require('./models/meteostationInsideParams');
const meteostationOutside = require('./models/meteostationOutsideParams');

const User = models.users
const MeteostationInside = meteostationInside
const MeteostationOutside = meteostationOutside

module.exports = {
    User, 
    MeteostationOutside,
    MeteostationInside
}