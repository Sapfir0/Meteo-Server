
document.addEventListener('DOMContentLoaded', async () => {
    
    var fullParams;

    const temperatureInHome = document.querySelector(".temperatureInHome")
    const humidityInHome = document.querySelector(".humidityInHome")
    const sansityInHome = document.querySelector(".sansityInHome")
    const temperature = document.querySelector(".temperature")
    const humidity = document.querySelector(".humidity")
    const pressure = document.querySelector(".pressure")
    const weatherDescription = document.querySelector(".weatherDescription")
    const createdAt = document.querySelector(".createdAt");

    const ctx = document.getElementById('myChart');

    //переписать 

    getlastArduinoValues()

    const graphicsResponse = await fetch("/chartsValues");
    const graphicValues = await graphicsResponse.json();

    var temperatureInHomeArray = graphicValues[0];
    var himidityInHomeArray = graphicValues[1];
    var temperatureArray = graphicValues[2];
    var himidityArray = graphicValues[3];
    var pressureArray = graphicValues[4];
    var weatherDescriptionArray = graphicValues[5];
    var arduinoTimestampArray = graphicValues[6];
    var createdAtArray = graphicValues[7];

    //         // var newCreatedAtArray=[]
    //         // for (let i = 0; i < createdAtArray.length; i++) {
    //         //     newCreatedAtArray[i] = dateToStr(new Date(createdAtArray[i]))
    //         //     console.log(newCreatedAtArray[i])
    //         // }
    //         // генерировать лейблы динамически, в зависимости от времени у данных
            

    var datasForCharts = {
        labels: createdAtArray,
        datasets: [{
            label: "Температура твоей попки",
            data: temperatureInHomeArray
        }]
    };

    var  options = {
        title: {
            display: true,
            text: 'Температурный режим'
        }
    }

    chartNewLineGraphic(ctx, datasForCharts, options)

        

    async function getlastArduinoValues() {
        const response = await fetch("/arduinoData");
        const arduinoValues = await response.json();
        console.log(arduinoValues)
    
        temperatureInHome.innerHTML = arduinoValues.temperatureInHome
        humidityInHome.innerHTML = arduinoValues.humidityInHome
        temperature.innerHTML = arduinoValues.temperature
        humidity.innerHTML = arduinoValues.humidity
        pressure.innerHTML = arduinoValues.pressure
        weatherDescription.innerHTML = arduinoValues.weatherDescription
        createdAt.innerHTML = arduinoValues.createdAt
    }


})




function chartNewLineGraphic(ctx, datasForCharts, options) {
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: datasForCharts,
        options: options
    });

}

//это не хорошо, но готовые функции есть только для инглиша
function dateToStr(date) {
    const now = new Date();
    let str;
    const nearlyDay =
        date.getYear() == now.getYear() && date.getMonth() == now.getMonth();
    const subDay = now.getDate() - date.getDate();

    if (nearlyDay && subDay == 1) {
        // вчера
        str = 'вчера ';
    } else if (nearlyDay && subDay == 0) {
        // сегодня
        str = 'сегодня ';
    } else {
        const month = [
            'Января',
            'Февраля',
            'Марта',
            'Апреля',
            'Мая',
            'Июня',
            'Июля',
            'Августа',
            'Сентября',
            'Октября',
            'Ноября',
            'Декабря'
        ];
        str = `${date.getDate()} ${
            month[date.getMonth() - 1]
        } ${date.getFullYear()}`;
    }

    str += ' в ' + date.toLocaleTimeString();
    return str;
}