import { createGraphics, setDatasForGraphic, chartNewLineGraphic, dateToStr } from "./graphic.js"

document.addEventListener('DOMContentLoaded', async () => {
    

    const temperatureInHome = document.querySelector(".temperatureInHome")
    const humidityInHome = document.querySelector(".humidityInHome")
    const sansityInHome = document.querySelector(".sansityInHome") //реализовать на арудино скан освещенности
    const temperature = document.querySelector(".temperature")
    const humidity = document.querySelector(".humidity")
    const pressure = document.querySelector(".pressure")
    const weatherDescription = document.querySelector(".weatherDescription")
    const createdAt = document.querySelector(".createdAt");

    const temperatureGraphic = document.getElementById('temperatureGraphic');
    const humidityGraphic = document.getElementById('humidityGraphic');

    getlastArduinoValues()

    const graphicValues = await getGraphicValues()
    createGraphics(graphicValues);



    const temperatureHint = document.querySelector(".temperatureInHomeHint")
    const humidityHint = document.querySelector(".humidityInHomeHint")
    const sansityHint = document.querySelector(".sansityHint")


    temperatureInHome.addEventListener('mouseover', () => {
        showError(temperatureHint, "Температура дома")
    })
    temperatureInHome.addEventListener('mouseout', () => {
        hideError(temperatureHint)
    })

    humidityInHome.addEventListener('mouseover', () => {
        showError(temperatureHint, "Влажность дома")
    })
    humidityInHome.addEventListener('mouseout', () => {
        hideError(temperatureHint)
    })

    sansityInHome.addEventListener('mouseover', () => {
        showError(temperatureHint, "Освещенность дома")
    })
    sansityInHome.addEventListener('mouseout', () => {
        hideError(temperatureHint)
    })



    // -------- быдло функции    

    async function getlastArduinoValues() { // запрос к бд на получение последних значений метеостанции
        const response = await fetch("/arduinoData");
        const arduinoValues = await response.json();
    
        temperatureInHome.innerHTML = arduinoValues.temperatureInHome
        humidityInHome.innerHTML = arduinoValues.humidityInHome
        temperature.innerHTML = arduinoValues.temperature
        humidity.innerHTML = arduinoValues.humidity
        pressure.innerHTML = arduinoValues.pressure
        weatherDescription.innerHTML = arduinoValues.weatherDescription
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
