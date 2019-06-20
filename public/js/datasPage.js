import { createGraphics, createComputerGraphic, dateToStr } from "./graphic.js"
import { showHint, hideHint } from "./helpers.js"
import { makeItRain } from "./rain.js"
import { getWeatherDescriptionIcon }from "./images.js"

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



    // block for hovers
    const temperatureInHomeBlock = document.querySelector("#temperatureInHomeBlock")
    const humidityInHomeBlock = document.querySelector("#humidityInHomeBlock")
    const sansityInHomeBlock = document.querySelector("#sansityInHomeBlock")
    const temperatureBlock = document.querySelector("#temperatureBlock")
    const humidityBlock = document.querySelector("#humidityBlock")
    const pressureBlock = document.querySelector("#pressureBlock")


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

        temperatureInHome.innerHTML = arduinoValues.temperatureH + " °C"
        humidityInHome.innerHTML = arduinoValues.humidityH + "%"
        temperature.innerHTML = arduinoValues.temperature + " °C"
        humidity.innerHTML = arduinoValues.humidity + "%"
        pressure.innerHTML = arduinoValues.pressure + " мм рт. ст."
        createdAt.innerHTML = dateToStr(new Date(arduinoValues.createdAt))
        weatherDescription = arduinoValues.engWeatherDescription

        isRainingNow(arduinoValues.engWeatherDescription) // это выбирает погодный эффект
        var oldIcon = 0
        if (oldIcon) {
            const openweathermapUrl = "https://openweathermap.org/img/w/" + arduinoValues.icon + ".png"; //топ картиночка
            weatherIcon.insertAdjacentHTML("beforeend", `<img src="${openweathermapUrl}" alt="Погода" id="weatherIcon" >` );
        }
        else {
            const iconId = getWeatherDescriptionIcon(arduinoValues.weatherId, arduinoValues.createdAt)
            const path =  iconId; //топ картиночка
            weatherIcon.insertAdjacentHTML("beforeend", `<img src="${path}" alt="Погода" id="weatherIcon" >` );
        }

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
        console.log(graphicValues)
        return graphicValues;
    }


})


function isRainingNow(engWeatherDescription) {
    const rainingNow = engWeatherDescription.indexOf("rain") 
    if (rainingNow != -1) {//found it
        makeItRain() // можно еще проверять хеви рейн или маелкнький
    }
}