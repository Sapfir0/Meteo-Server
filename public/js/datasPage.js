import { createGraphics, createComputerGraphic } from "./graphic.js"
import { showHint, hideHint, dateToStr, getTimeFromUnixTime } from "./helpers.js"
import { getWeatherDescriptionIcon, getThermometer } from "./images.js"

import { sunshine } from "./weathers/clear_sky.js"
import { makeItRain } from "./weathers/rain.js"

document.addEventListener('DOMContentLoaded', async () => {
    // console.log(document.body.clientWidth)
    // console.log(document.body.clientHeight)

    // widgets
    const temperatureInHome = document.querySelector(".temperatureInHome")
    const humidityInHome = document.querySelector(".humidityInHome")
    const sansityInHome = document.querySelector(".sansityInHome") //реализовать на арудино скан освещенности
    const temperature = document.querySelector(".temperature")
    const humidity = document.querySelector(".humidity")
    const pressure = document.querySelector(".pressure")
    const createdAt = document.querySelector(".createdAt");
    const weatherIcon = document.querySelector(".weatherIcon")
    const sunset = document.querySelector(".sunset")
    const sunrise = document.querySelector(".sunrise")

    let weatherDescription; // dynamic string, got from arduino
    getlastArduinoValues()

    const graphicValues = await getMeteostationGraphicValues()
    createGraphics(graphicValues);

    // hints
    const temperatureInHomeHint = document.querySelector(".temperatureInHomeHint")
    const humidityInHomeHint = document.querySelector(".humidityInHomeHint")
    const temperatureHint = document.querySelector(".temperatureHint")
    const humidityHint = document.querySelector(".humidityHint")
    const pressureHint = document.querySelector(".pressureHint")
    const weatherIconHint = document.querySelector(".weatherIconHint")
    const sansityHint = document.querySelector(".sansityHint")
    const sunsetHint = document.querySelector("#sunsetHint")
    const sunriseHint = document.querySelector("#sunriseHint")


    // block for hovers
    const temperatureInHomeBlock = document.querySelector("#temperatureInHomeBlock")
    const humidityInHomeBlock = document.querySelector("#humidityInHomeBlock")
    const sansityInHomeBlock = document.querySelector("#sansityInHomeBlock")
    const temperatureBlock = document.querySelector("#temperatureBlock")
    const humidityBlock = document.querySelector("#humidityBlock")
    const pressureBlock = document.querySelector("#pressureBlock")
    const sunsetBlock = document.querySelector("#sunsetBlock")
    const sunriseBlock = document.querySelector("#sunriseBlock")

    //единственное что важно в этих массивах - это сохранить корректность тройки значений(они должны быть на одном i)
    const widgets=[temperatureInHomeBlock, humidityInHomeBlock, temperatureBlock, 
        humidityBlock, pressureBlock, sansityInHomeBlock, weatherIconBlock]
    const hints = [temperatureInHomeHint, humidityInHomeHint, 
        temperatureHint, humidityHint, pressureHint, sansityHint, weatherIconHint]
    const stingsHints = ["Температура дома", "Влажность дома", 
    "Температура на улице", "Влажность на улице", "Атмосферное давление на улице", "Освещенность дома", weatherDescription]


    for(let i=0; i<widgets.length; i++) {
        widgets[i].addEventListener('mouseover', () => {
            showHint(hints[i], stingsHints[i])
        })
        widgets[i].addEventListener('mouseout', () => {
            hideHint(hints[i])
        })
    }
    

    const computerGraphicValues = await getlastComputerParams()
    createComputerGraphic(computerGraphicValues);

    // -------- быдло функции    

    async function getlastArduinoValues() { // запрос к бд на получение последних значений метеостанции
        let arduinoValues
        try {
            const response = await fetch("/meteostationData");
            arduinoValues = await response.json();
        }
        catch(err) {
            console.error(err);
        }
        console.log(arduinoValues)
        for(let i in arduinoValues) {
            if (arduinoValues[i] == "521") {
                console.error("Не указан id метеостанции")
                const body = document.querySelector("body")
                body.insertAdjacentHTML("afterbegin", `<p> Не указан id метеостанции`)
                const graphics = document.querySelector(".graphics")
                const home = document.querySelector(".home")
                const street = document.querySelector(".street")
                graphics.className = "unknown"
                home.className = "unknown"
                street.className = "unknown"

                return -1
            }
        }

        const thermometerIcon = document.querySelector("#thermometer")
        const path = getThermometer(arduinoValues.weatherId)
        thermometerIcon.src = path

        temperatureInHome.innerHTML = arduinoValues.temperatureH + " °C"
        humidityInHome.innerHTML = arduinoValues.humidityH + "%"
        temperature.innerHTML = arduinoValues.temperature + " °C"
        humidity.innerHTML = arduinoValues.humidity + "%"
        pressure.innerHTML = arduinoValues.pressure + " мм рт. ст."
        createdAt.innerHTML = `Данные были получены  ` + dateToStr(new Date(arduinoValues.createdAt))
        weatherDescription = arduinoValues.engWeatherDescription
        sunrise.innerHTML  = getTimeFromUnixTime(arduinoValues.sunriseTime)
        sunset.innerHTML = getTimeFromUnixTime(arduinoValues.sunsetTime)

 
        console.log()

        var oldIcon = 0 
        if (oldIcon) {
            const openweathermapUrl = "https://openweathermap.org/img/w/" + arduinoValues.icon + ".png"; //топ картиночка
            weatherIcon.src = openweathermapUrl
        }
        else {
            const iconId = getWeatherDescriptionIcon(arduinoValues.weatherId, arduinoValues.createdAt)
            weatherIcon.src = iconId
        }
        isRainingNow(arduinoValues.engWeatherDescription) // это выбирает погодный эффект
        isClearSkyNow(arduinoValues.weatherId)
}

    async function getlastComputerParams() { 
        const createdAtCpu = document.querySelector(".createdAtCpu")

        const response = await fetch("/computerLoadParams");
        const computerValues = await response.json();
        //console.log(computerValues); 
        createdAtCpu.innerHTML = dateToStr(new Date(computerValues.createdAt))

        return computerValues
    }

    async function getMeteostationGraphicValues() { // получение всех значений))) в массиве. каждый массив - столбец бд (переделать в объект)
        const graphicsResponse = await fetch("/chartsValues");
        const graphicValues = await graphicsResponse.json();
        //console.log(graphicValues)
        return graphicValues;
    }


})


function isRainingNow(engWeatherDescription) {
    const rainingNow = engWeatherDescription.indexOf("rain") 
    if (rainingNow != -1) {//found it
        makeItRain() // можно еще проверять хеви рейн или маелкнький
    }
}

function isClearSkyNow(weatherId) {
    if(weatherId == 800) {
        console.log("ясно. солнце вышло")
        sunshine()
    }
}