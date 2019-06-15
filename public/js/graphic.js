
export function createGraphics(graphicValues) {
    const temperatureGraphic = document.getElementById('temperatureGraphic');
    const humidityGraphic = document.getElementById('humidityGraphic');
    const CPU_load_iostat_graphic = document.getElementById('CPU_load_iostat_graphic')
    const CPU_load_uptime_graphic = document.getElementById('CPU_load_uptime_graphic')


    let datasForCharts
    let options = {
        title: {
            responsive: true,
            maintainAspectRatio: false,
            display: true,
            text: 'Температурный режим'
        }
    }

    
    const temperatureInHomeArray = graphicValues.temperatureH;
    const humidityInHomeArray = graphicValues.humidityH;
    const createdAtArray = graphicValues.createdAt;
    
    for (let i = 0; i < createdAtArray.length; i++) {
        createdAtArray[i] = dateToStr(new Date(createdAtArray[i]))
    }


    datasForCharts = setDatasForGraphic(createdAtArray,temperatureInHomeArray,"Температура твоей попки")
    chartNewLineGraphic(temperatureGraphic, datasForCharts, options)

    datasForCharts = setDatasForGraphic(createdAtArray,humidityInHomeArray,"Влажность твоей попки")
    chartNewLineGraphic(humidityGraphic, datasForCharts, options)

    datasForCharts = setDatasForGraphic(createdAtArray, CPU_load_iostat_graphic  ) 
    chartNewPieGraphic(CPU_load_iostat_graphic, datasForCharts, options )
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
    var chart = new Chart(ctx, {
        type: 'line',
        data: datasForCharts,
        options: options,
    });

}

export function chartNewPieGraphic(ctx, datasForCharts, options) {
    var chart = new Chart(ctx, {
        type: 'pie',
        data: datasForCharts,
        options: options,
    });

    //chart.canvas.parentNode.style.height = '128px'; //ВАЖНО СМОТРИ СЮДА

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