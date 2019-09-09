export function getWeatherDescriptionIcon(weatherId, createdAt) { //это можно упростить
    const imgId = parseWeatherId(weatherId)

    //после выбора добавить d или n, если файла без них нет
    let timePrefix ="";
    if( weatherId==741 || weatherId==800 || weatherId==801 || weatherId==802) { // только для этих есть ночная версия
        if ( isNight(createdAt) ) {
            timePrefix="n"
        }
        else {
            timePrefix="d"
        }
    }
    let pathToIcon = "/img/weatherIconsSVG/" + imgId + timePrefix + ".svg"
    return pathToIcon
}


export function getThermometer(weatherId) {
    const thermId = getParsedWeatherIdThermometer(weatherId)
    return "/img/weatherParamsSVG/" + thermId + "-thermometer.svg"
}



function isNight(currentTime) {
    currentTime = new Date(currentTime)
    const hours = currentTime.getHours();
    console.log(currentTime)
    console.log(hours)

    return hours > 22 || hours < 8;

}


function parseWeatherId(weatherId) { // этой функции можно было избежать если было бы достаточно картинок
    if (weatherId >= 200 && weatherId <= 212 ) { //thunderstoprm
        return 201
    }
    else if(weatherId > 212 && weatherId < 232 ) { //thunderstoprm
        return 202
    }
    else if(weatherId >=300 && weatherId <= 321) { //drizzle
        return 300
    }
    else if(weatherId == 500 || weatherId == 501  ) { //rain
        return 501
    }
    else if ( weatherId>501 && weatherId <= 511) {
        return 502
    }
    else if(weatherId>511 && weatherId<531) {
        return 521
    }
    else if(weatherId >= 611 && weatherId <= 613) {
        return 612
    }
    else if(weatherId >=615 && weatherId<=622) {
        return 615
    }
    else if(weatherId >= 701 & weatherId<=721) {
        return 701
    }
    else if(weatherId==751 || weatherId==761) {
        return 741
    }
    console.warn("Вернулся обычный айди, возможно, все в порядке. Weather id=" + weatherId)
    return weatherId
 // в коммите за 20.06 убрал лишние блоки
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