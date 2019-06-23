const { MeteostationInside, MeteostationOutside } = require("../database/tables")


function writeMeteostationInsideParams(temperatureH, humidityH, sansityH, meteostationId) {
    return MeteostationInside.create({
        temperatureH,
        humidityH,
        sansityH,
        meteostationId
    })
}

function writeMeteostationOutsideParams(temperature, humidity, pressure, 
    engWeatherDescription, weatherId, windSpeed, windDeg, sunriseTime, sunsetTime,  icon, meteostationId) {
    
    return MeteostationOutside.create({
        temperature,
        humidity,
        pressure,
        engWeatherDescription,
        weatherId,
        windSpeed,
        windDeg,
        icon,
        sunriseTime, 
        sunsetTime,
        meteostationId
    })
}



module.exports = {
    writeMeteostationInsideParams,
    writeMeteostationOutsideParams,

}