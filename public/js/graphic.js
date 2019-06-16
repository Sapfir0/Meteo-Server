let datasForCharts
let options

export function createGraphics(graphicValues) {

    const temperatureGraphic = document.getElementById('temperatureGraphic').getContext('2d');
    const humidityGraphic = document.getElementById('humidityGraphic').getContext('2d');
    console.log(graphicValues)
    
    const temperatureInHomeArray = graphicValues.temperatureH;
    const humidityInHomeArray = graphicValues.humidityH;
    const createdAtArray = graphicValues.createdAt;
    
    for (let i = 0; i < createdAtArray.length; i++) {
        createdAtArray[i] = dateToStr(new Date(createdAtArray[i]))
    }


    datasForCharts = setDatasForGraphic(createdAtArray,temperatureInHomeArray,"Температура твоей попки")
    //так-с
    //найдем мин и макс значение и умножим каждое на 0.01 и сложим соотсвтенно
    var Tmin = Math.min( ...temperatureInHomeArray ),
        Tmax = Math.max( ...temperatureInHomeArray );

    var Hmin = Math.min( ...humidityInHomeArray ),
        Hmax = Math.max( ...humidityInHomeArray );


    options = setOptionForLineGraphic("Температура", Tmin*0.9, Tmax*1.1)
    chartNewLineGraphic(temperatureGraphic, datasForCharts, options)

    datasForCharts = setDatasForGraphic(createdAtArray,humidityInHomeArray,"Влажность твоей попки")
    options = setOptionForLineGraphic("Влажность", Hmin*0.9, Hmax*1.1)
    chartNewLineGraphic(humidityGraphic, datasForCharts, options)


}

export function createComputerGraphic(graphicValues) {
    const CPU_load_iostat_graphic = document.getElementById('CPU_load_iostat_graphic').getContext('2d');
    const CPU_load_uptime_graphic = document.getElementById('CPU_load_uptime_graphic').getContext('2d');
    console.log(graphicValues)

    var data = [graphicValues.CPU_load_iostat, 100-graphicValues.CPU_load_iostat]
    var labels = ["Занято", "Свободно"]

    datasForCharts = setDatasForPieGraphic(data, labels) 
    options = setOptionForGraphic("Нагруженность CPU, %")
    chartNewPieGraphic(CPU_load_iostat_graphic, datasForCharts, options )


    data = [graphicValues.CPU_currentLoad, graphicValues.CPU_15minute_load, graphicValues.CPU_5minute_load]
    labels = ["Текущая нагрузка", "5-минутная", "15-минутная"]
    var min = Math.min( ...data ),
        max = Math.max( ...data );

    console.log(min, max)

    datasForCharts = setDatasForBarGraphic(data, labels, "Сложные данные для убергениев. Подсказка скоро будет") 
    options = setOptionForBarGraphic("Нагруженность цпу", min*0.9, max*1.05)
    chartNewBarGraphic(CPU_load_uptime_graphic, datasForCharts, options )

}


export function setDatasForBarGraphic(data, labels, label) {
    let datasForCharts = {
        labels: labels, // подпись на оси Х
        datasets: [{
            label: label, // подпись самого графика
            data: data, // точки для графика
            backgroundColor: [
                // '#ffcd56',
                // '#4bc0c0'
            ]
        }]
    };

    return datasForCharts;
}




export function setDatasForPieGraphic(data, labels) {
    let datasForCharts = {
        labels: labels, // подпись на оси Х
        datasets: [{
            data: data, // точки для графика
            backgroundColor: [
                '#ffcd56',
                '#4bc0c0'
            ]
        }]
    };

    return datasForCharts;
}

function setOptionForBarGraphic(text, ymin, ymax) {
    let options = {	
        responsive: true,
        title: {
            display: true,
            text: text
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: ymin,
                    max: ymax
                }
            }]
        }        
    }
    return options
}


function setOptionForLineGraphic(text, ymin, ymax) {
    let options = {	
        responsive: true,
        title: {
            display: true,
            text: text
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            yAxes: [{
                ticks: {
                     min: ymin,
                        max: ymax
                }
            }]
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        
    }
    return options
}



function setOptionForGraphic(text) {
    let options = {	
        responsive: true,
        title: {
            display: true,
            text: text
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        // tooltips: {
        //     mode: 'index',
        //     intersect: false,
        // },
    }
    return options
}


export function setDatasForGraphic(labels, data, label) {
    let datasForCharts = {
        labels: labels, // подпись на оси Х
        datasets: [{
            label: label, // подпись самого графика
            data: data, // точки для графика,
            //backgroundColor:  fillPattern

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

export function chartNewBarGraphic(ctx, datasForCharts, options) {
    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: datasForCharts,
        options: options
    });
}

export function chartNewPieGraphic(ctx, datasForCharts, options) {
    var chart = new Chart(ctx, {
        type: 'pie',
        data: datasForCharts,
        options: options,
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