
export function createGraphics(graphicValues) {
    let datasForCharts
    let options = {
        title: {
            display: true,
            text: 'Температурный режим'
        }
    }
    console.log(graphicValues)
    
    const temperatureInHomeArray = graphicValues.temperatureInHome;
    const humidityInHomeArray = graphicValues.humidityInHome;
    // const temperatureArray = graphicValues[2];
    // const himidityArray = graphicValues[3];
    // const pressureArray = graphicValues[4];
    // const weatherDescriptionArray = graphicValues[5];
    // const arduinoTimestampArray = graphicValues[6];
    const createdAtArray = graphicValues.createdAt;
    
    for (let i = 0; i < createdAtArray.length; i++) {
        createdAtArray[i] = dateToStr(new Date(createdAtArray[i]))
    }


    datasForCharts = setDatasForGraphic(createdAtArray,temperatureInHomeArray,"Температура твоей попки")
    chartNewLineGraphic(temperatureGraphic, datasForCharts, options)

    datasForCharts = setDatasForGraphic(createdAtArray,humidityInHomeArray,"Влажность твоей попки")
    chartNewLineGraphic(humidityGraphic, datasForCharts, options)

}

export function setDatasForGraphic(labels, data, label) {
    let datasForCharts = {
        labels: labels, // подпись на оси Х
        datasets: [{
            label: label, // подпись самого графика
            data: data // точки для графика
            // borderColor: 'gray',
            // backgroundColor: 'orange',

        }]
    };

    return datasForCharts;
}


export function chartNewLineGraphic(ctx, datasForCharts, options) {
    new Chart(ctx, {
        type: 'line',
        data: datasForCharts,
        options: options
    });

}

//это не хорошо, но готовые функции есть только для инглиша
export function dateToStr(date) {
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

    str += ' в ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    return str;
}