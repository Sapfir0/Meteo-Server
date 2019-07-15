import { criticalHighHum, criticalHighTemp, criticalLowHum, criticalLowTemp, colorOfHomeGraphic, colorOfStreetGraphic, font_color } from "./colorSettings.js"

export function setDatasForHumidityGraphic(labels, data, label, data2, label2) {
    let datasForCharts = {
        labels: labels, // подпись на оси Х
        datasets: [{
            label: label, // подпись самого графика
            fill:false,
            color: "#f1f3f4",
            borderColor: '#f1f3f4',
            data: data, // точки для графика,', 
            backgroundColor: "SandyBrown", //sandlybrown
            pointBackgroundColor: (context) => {
                const index = context.dataIndex;
                const value = context.dataset.data[index];
                if (value > criticalHighHum) return "blue" //аха а тут наоборот, типа нижнее значение будет красным
                else if(value < criticalLowHum) return "red"
                else return "#edd9db" 
            }
        },
        {
            label: label2, // подпись самого графика
            fill:false,
            color: "#87cf3e",
            borderColor: '#87cf3e',
            data: data2, // точки для графика,', 
            backgroundColor: "ForestGreen",  //limegreen
            pointBackgroundColor: (context) => {
                const index = context.dataIndex;
                const value = context.dataset.data[index];
                if (value > criticalHighHum) return "blue" //аха а тут наоборот, типа нижнее значение будет красным
                else if(value < criticalLowHum) return "red"
                else return "#edd9db" 
            }       
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
            borderColor: colorOfHomeGraphic,
            data: data, // точки для графика,', 
            backgroundColor: colorOfHomeGraphic ,
            pointBackgroundColor: (context) => {
                var index = context.dataIndex;
                var value = context.dataset.data[index];
                if (value > criticalHighTemp) return "red"
                else if(value < criticalLowTemp) return "blue" 
                else return "#edd9db" 
            }
        },
        {
            label: label2, // подпись самого графика
            // fill:false,
            data: data2, // точки для графика,', 
            backgroundColor: colorOfStreetGraphic ,
            borderColor: colorOfStreetGraphic,

            pointBackgroundColor: (context) => {
                const index = context.dataIndex;
                const value = context.dataset.data[index];
                if (value > criticalHighTemp) return "red"
                else if(value < criticalLowTemp) return "blue" 
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
