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
            //console.log(arduinoValues)
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




        var data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                //label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
              },
              {
                label: "My Second dataset",
                // fillColor: "rgba(151,187,205,0.2)",
                // strokeColor: "rgba(151,187,205,1)",
                // pointColor: "rgba(151,187,205,1)",
                // pointStrokeColor: "#fff",
                // pointHighlightFill: "#fff",
                // pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
              }
            ]
          };
        
        const ctx = document.getElementById('myChart');
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                title: {
                    display: true,
                    text: 'Температурный режим'
                }
            }

        });
})


function getQuery() {

}
