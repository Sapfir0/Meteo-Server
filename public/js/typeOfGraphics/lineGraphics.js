import { criticalHighHum, criticalHighTemp, criticalLowHum, criticalLowTemp, colorOfHomeGraphic, colorOfStreetGraphic, font_color } from "./colorSettings.js"

export function setDatasForLineGraphic(labels, data, label, data2, label2, criticalLowParam, criticalHighParam) {
    let datasForCharts = {
        labels: labels, // подпись на оси Х
        datasets: [{
            label: label, // подпись самого графика
            fill:false,
            color: colorOfHomeGraphic,
            borderColor: colorOfHomeGraphic,
            data: data, // точки для графика,', 
            backgroundColor: colorOfHomeGraphic,
            pointBackgroundColor: (context) => {
                const index = context.dataIndex;
                const value = context.dataset.data[index];
                if (value > criticalHighParam || value < criticalLowParam) return "red"
                else return "#edd9db" 
            }
        },
        {
            label: label2, // подпись самого графика
            fill:false,
            color: colorOfStreetGraphic,
            borderColor: colorOfStreetGraphic,
            data: data2, // точки для графика,', 
            backgroundColor: colorOfStreetGraphic, 
            pointBackgroundColor: (context) => {
                const index = context.dataIndex;
                const value = context.dataset.data[index];
                if (value > criticalHighParam || value < criticalLowParam) return "red"
                else return "#edd9db" 
            }       
        }]
    };

    return datasForCharts;
}


export function chartNewLineGraphic(ctx, datasForCharts, options) {
    new Chart(ctx, {
        type: "line",
        data: datasForCharts,
        options: options,
    });
}


export function setOptionForLineGraphic(text, ymin, ymax, charTitle="") {
    let options = {	
        responsive: false,
        maintainAspectRatio: false,
        title: {
            display: true,
            text: text,
            fontColor: font_color
        },
        hover: {
            mode: "nearest",
            intersect: true
        },
        legend: {
            display: true,
            labels: {
                fontColor: font_color
            }
        },
        tooltips: {
            mode: "index",
            intersect: false,
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: font_color,
                    min: Math.round(ymin),
                    max: Math.round(ymax),
                    callback: (value) => {
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
    // if(!ymin) {
    //     options.scales.yAxes[0].ticks.suggestedMin
    // }
    return options
}
