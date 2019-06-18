import { colorOfHomeGraphic, colorOfStreetGraphic, font_color } from "./colorSettings.js"


export function setDatasForHumidityGraphic(labels, data, label, data2, label2) {
    let datasForCharts = {
        labels: labels, // подпись на оси Х
        datasets: [{
            label: label, // подпись самого графика
            // fill:false,
            data: data, // точки для графика,', 
            backgroundColor: colorOfHomeGraphic
        },
        {
            label: label2, // подпись самого графика
            // fill:false,
            data: data2, // точки для графика,', 
            backgroundColor: colorOfStreetGraphic
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
            backgroundColor: colorOfHomeGraphic ,
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
            backgroundColor: colorOfStreetGraphic ,
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


export function setOptionForLineGraphic(text, ymin=SuggestedMin, ymax=SuggestedMax, charTitle='') {
    let options = {	
        responsive: false,
        maintainAspectRatio: false,
        title: {
            display: true,
            text: text,
            fontColor: font_color
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        legend: {
            display: true,
            labels: {
                fontColor: font_color
            }
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: font_color,
                    min: Math.round(ymin),
                    max: Math.round(ymax),
                    callback: function(value) {
                        return value + charTitle; //подпись на оси y
                    }
                },
            }],
            xAxes: [{
                ticks: { 
                    fontColor: font_color
                },
                gridLines: {
                    display: false
                }
            }]
        }  
    }
    return options
}
