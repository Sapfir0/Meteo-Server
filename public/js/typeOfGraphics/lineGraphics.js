
export function setDatasForHumidityGraphic(labels, data, label, data2, label2) {
    let datasForCharts = {
        labels: labels, // подпись на оси Х
        datasets: [{
            label: label, // подпись самого графика
            // fill:false,
            data: data, // точки для графика,', 
            backgroundColor: 'rgba(246,232,233, 0.5)' 
        },
        {
            label: label2, // подпись самого графика
            // fill:false,
            data: data2, // точки для графика,', 
            backgroundColor: 'rgba(148,185,17, 0.5)' 
        }]
    };

    return datasForCharts;
}

export function setDatasForTemperatureGraphic(labels, data, label, data2, label2) {
    let datasForCharts = {
        labels: labels, // подпись на оси Х
        datasets: [{
            label: label, // подпись самого графика
            // fill:false,
            
            data: data, // точки для графика,', 
            backgroundColor: 'rgba(246,232,233, 0.5)' ,
            pointBackgroundColor: function(context) {
                var index = context.dataIndex;
                var value = context.dataset.data[index];

                return value > 40 ? 'red' : '#edd9db' 
            }
        },
        {
            label: label2, // подпись самого графика
            // fill:false,
            data: data2, // точки для графика,', 
            backgroundColor: 'rgba(148,185,17, 0.5)' ,
            pointBackgroundColor: function(context) {
                var index = context.dataIndex;
                var value = context.dataset.data[index];

                return value > 40 ? 'red' : '#edd9db' 
            }
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


export function setOptionForLineGraphic(text, ymin, ymax) {
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
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: Math.round(ymin),
                    max: Math.round(ymax)
                },
            }],
            xAxes: [{
                gridLines: {
                    display: false
                }
            }]
        }  
    }
    return options
}

