import { createGraphics, setDatasForGraphic, chartNewLineGraphic, dateToStr } from "./graphic.js"



document.addEventListener('DOMContentLoaded', async () => {
    

    const temperatureInHome = document.querySelector(".temperatureInHome")
    const humidityInHome = document.querySelector(".humidityInHome")
    const sansityInHome = document.querySelector(".sansityInHome") //реализовать на арудино скан освещенности
    const temperature = document.querySelector(".temperature")
    const humidity = document.querySelector(".humidity")
    const pressure = document.querySelector(".pressure")
    const engWeatherDescription = document.querySelector(".engWeatherDescription")
    const createdAt = document.querySelector(".createdAt");

    const temperatureGraphic = document.getElementById('temperatureGraphic');
    const humidityGraphic = document.getElementById('humidityGraphic');

    getlastArduinoValues()

    const graphicValues = await getGraphicValues()
    createGraphics(graphicValues);



    const temperatureInHomeHint = document.querySelector(".temperatureInHomeHint")
    const humidityInHomeHint = document.querySelector(".humidityInHomeHint")
    const temperatureHint = document.querySelector(".temperatureHint")
    const humidityHint = document.querySelector(".humidityHint")
    const pressureHint = document.querySelector(".pressureHint")
    const engWeatherDescriptionHint = document.querySelector(".engWeatherDescriptionHint")


    const sansityHint = document.querySelector(".sansityHint")

    temperatureInHome.addEventListener('mouseover', () => {
        showError(temperatureInHomeHint, "Температура дома")
    })
    temperatureInHome.addEventListener('mouseout', () => {
        hideError(temperatureInHomeHint)
    })

    humidityInHome.addEventListener('mouseover', () => {
        showError(humidityInHomeHint , "Влажность дома")
    })
    humidityInHome.addEventListener('mouseout', () => {
        hideError(humidityInHomeHint )
    })

    temperature.addEventListener('mouseover', () => {
        showError(temperatureHint, "Температура на улице")
    })
    temperature.addEventListener('mouseout', () => {
        hideError(temperatureHint)
    })

    humidity.addEventListener('mouseover', () => {
        showError(humidityHint , "Влажность на улице")
    })
    humidity.addEventListener('mouseout', () => {
        hideError(humidityHint )
    })

    pressure.addEventListener('mouseover', () => {
        showError(pressureHint , "Атмосферное давление на улице")
    })
    pressure.addEventListener('mouseout', () => {
        hideError(pressureHint )
    })

    sansityInHome.addEventListener('mouseover', () => {
        showError(sansityHint, "Освещенность дома")
    })
    sansityInHome.addEventListener('mouseout', () => {
        hideError(sansityHint)
    })



    // -------- быдло функции    

    async function getlastArduinoValues() { // запрос к бд на получение последних значений метеостанции
        const response = await fetch("/arduinoData");
        const arduinoValues = await response.json();
        console.log(arduinoValues.engWeatherDescription)
        temperatureInHome.innerHTML = arduinoValues.temperatureInHome + " °C"
        humidityInHome.innerHTML = arduinoValues.humidityInHome + "%"
        temperature.innerHTML = arduinoValues.temperature + " °C"
        humidity.innerHTML = arduinoValues.humidity + "%"
        pressure.innerHTML = arduinoValues.pressure + " мм рт. ст."
        engWeatherDescription.innerHTML = arduinoValues.engWeatherDescription
        createdAt.innerHTML = dateToStr(new Date(arduinoValues.createdAt))
    }

    async function getGraphicValues() { // получение всех значений))) в массиве. каждый массив - столбец бд (переделать в объект)
        const graphicsResponse = await fetch("/chartsValues");
        const graphicValues = await graphicsResponse.json();
        return graphicValues;
    }


})


function showError(widget, str) {
    widget.innerHTML = str;
    widget.className = 'error active';
}

function hideError(widget) {
    widget.innerHTML = '';
    widget.className = 'error';
}
