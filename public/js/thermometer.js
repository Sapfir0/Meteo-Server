

export function getThermometer(weatherId) {
    const thermId = getParsedWeatherIdThermometer(weatherId)
    return "/img/weatherParamsSVG/" + thermId + "-thermometer.svg"

}


function getParsedWeatherIdThermometer(weatherId) {
    if( (weatherId>=500 && weatherId<=531) || (weatherId>=300 && weatherId<=321 || (weatherId>=200 && weatherId<=232)) ) {
        //rain
        return 1
    }
    else if(weatherId>=600 && weatherId<=622) {
        //snow
        return 0
    }
    if(weatherId == 800) {
        //clear
        return 2
    }
    else if(weatherId>=801 && weatherId<=804) {
        // cloudy
        return 3
    }
    else {
        // atmosphere
        return 4
    }

}