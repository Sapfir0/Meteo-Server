const profilesApi = require("../services/profiles")

function updateSettings(req, res, next) {
    const settings = req.body
    profilesApi.writeProfiles(req.user.id, req.body.oldWeatherDescriptionIcons)
    console.log(settings)
    next()
}

module.exports = {
    updateSettings
}