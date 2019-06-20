

function updateSettings(req, res, next) {
    const settings = req.body
    console.log(settings)
    next()
}

module.exports = {
    updateSettings
}