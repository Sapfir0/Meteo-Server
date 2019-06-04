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

    //вынести работу с графиками в отдельный файл
    let datasForCharts
    let options = {
        title: {
            display: true,
            text: 'Температурный режим'
        }
    }

    getlastArduinoValues()

    const graphicValues = await getGraphicValues()
    createGraphics(graphicValues);


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

    function createGraphics(graphicValues) {
        const temperatureInHomeArray = graphicValues[0];
        const humidityInHomeArray = graphicValues[1];
        const temperatureArray = graphicValues[2];
        const himidityArray = graphicValues[3];
        const pressureArray = graphicValues[4];
        const weatherDescriptionArray = graphicValues[5];
        const arduinoTimestampArray = graphicValues[6];
        const createdAtArray = graphicValues[7];
    
        for (let i = 0; i < createdAtArray.length; i++) {
            createdAtArray[i] = dateToStr(new Date(createdAtArray[i]))
        }

        // есть баг, если обновлять страницу, графики цикл выше может не выполниться

        datasForCharts = setDatasForGraphic(createdAtArray,temperatureInHomeArray,"Температура твоей попки")
        chartNewLineGraphic(temperatureGraphic, datasForCharts, options)

        datasForCharts = setDatasForGraphic(createdAtArray,humidityInHomeArray,"Влажность твоей попки")
        chartNewLineGraphic(humidityGraphic, datasForCharts, options)

    }
})



function setDatasForGraphic(labels, data, label) {
    let datasForCharts = {
        labels: labels, // подпись на оси Х
        datasets: [{
            label: label, // подпись самого графика
            data: data // точки для графика
        }]
    };

    return datasForCharts;
}


function chartNewLineGraphic(ctx, datasForCharts, options) {
    new Chart(ctx, {
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
        const month = ['Января','Февраля','Марта','Апреля','Мая',
            'Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря'
        ];
        str = `${date.getDate()} ${
            month[date.getMonth() - 1]
        } ${date.getFullYear()}`;
    }

    str += ' в ' + date.toLocaleTimeString();
    return str;
}