var arduinoValues; 

document.addEventListener('DOMContentLoaded', () => {
    const temperatureInHome = document.querySelector(".temperatureInHome")
    const humidityInHome = document.querySelector(".humidityInHome")
    const sansityInHome = document.querySelector(".sansityInHome")
    const temperature = document.querySelector(".temperature")
    const humidity = document.querySelector(".humidity")
    const pressure = document.querySelector(".pressure")
    const weatherDescription = document.querySelector(".weatherDescription")
    const createdAt = document.querySelector(".createdAt");
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
            createdAt.innerHTML = arduinoValues.createdAt
        })
        .catch(err => {
            console.error(err);
        })

        
        // var ctx = document.getElementById('myChart');
        // var myLineChart = new Chart(ctx, {
        //     type: 'line',
        //     data: {
        //         label: '# of Votes',
        //         datasets: [{
        //             data: [12, 19, 3, 5, 2, 3]
        //         }] 
        //     }

        // });
})


function getQuery() {

}
