var arduinoValues; 

document.addEventListener('DOMContentLoaded', () => {
    const temperatureInHome = document.querySelector(".temperatureInHome")
    const humidityInHome = document.querySelector(".humidityInHome")
    const sansityInHome = document.querySelector(".sansityInHome")
    const temperature = document.querySelector(".temperature")
    const humidity = document.querySelector(".humidity")
    const pressure = document.querySelector(".pressure")
    const weatherDescription = document.querySelector(".weatherDescription")
    
    // :( очень нехороший ход сделаю
    //переписать 

    
    fetch("/arduinoData")
        .then( (json) => {
            return json.json();
        })
        .then(json => {
            arduinoValues= json;
            console.log(arduinoValues)
            return json;
        })
        .then( () => {
            temperatureInHome.innerHTML = arduinoValues.temperatureInHome
            humidityInHome.innerHTML = arduinoValues.humidityInHome
            temperature.innerHTML = arduinoValues.temperature
            humidity.innerHTML = arduinoValues.humidity
            pressure.innerHTML = arduinoValues.pressure
            weatherDescription.innerHTML = arduinoValues.weatherDescription

        })
        .catch(err => {
            console.error(err);
        })

    
})


function getQuery() {

}
