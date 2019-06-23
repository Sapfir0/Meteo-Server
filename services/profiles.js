const { Profle } = require("../database/tables")



function writeProfiles(userId, oldWeatherDescriptionIcons) {
    return Profle.update({
        oldWeatherDescriptionIcons    
    }, 
        {
            where: {
                id: userId
            }

        }
    )
}

function writeEmptyProfile() {
    return Profle.create()
}

module.exports = {
    writeEmptyProfile,
    writeProfiles
}

