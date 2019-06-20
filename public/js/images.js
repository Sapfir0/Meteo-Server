


export function getWeatherDescriptionIcon(weatherId, createdAt) { //это можно упростить
    const imgId = parseWeatherId(weatherId)
    console.log(weatherId)

    //после выбора добавить d или n, если файла без них нет
    console.log(imgId)
    let timePrefix ='';
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


function isNight(currentTime) {
    var hours = currentTime.getHours();
    console.log(hours)
    if(hours > 22 || hours < 8) {
        return true
    }
    else {
        return false
    }

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
    // else if(weatherId==531) {
    //     return 531
    // }
    // else if(weatherId==600) {
    //     return 600
    // }
    // else if(weatherId==601) {
    //     return 601
    // }
    else if(weatherId >= 611 && weatherId <= 613) {
        return 612
    }
    else if(weatherId >=615 && weatherId<=622) {
        return 615
    }
    else if(weatherId >= 701 & weatherId<=721) {
        return 701
    }
    // else if(weatherId==741) {
    //     return 741
    // }
    else if(weatherId==751 || weatherId==761) {
        return 741
    }
    else if(weatherId==762) {
        return "I havnt image on this situation";
    }
    // else if(weatherId==771) {
    //     return 771
    // }
    // else if(weatherId==781) {
    //     return 781
    // }
    // else if(weatherId==800) {
    //     return 800
    // }
    // else if(weatherId==801) {
    //     return 801 //можно если имеется сильный ветер добавлять отдельную иконку( и в 802)
    // }
    // else if(weatherId==802) {
    //     return 802
    // }
    // else if(weatherId==803) {
    //     return 803
    // }
    // else if(weatherId==804) {
    //     return 804
    // }
    console.warn("Вернулся обычный айди, возможно, все в порядке")
    return weatherId

}