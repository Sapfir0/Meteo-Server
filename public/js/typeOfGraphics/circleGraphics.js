import { colorA, colorB, font_color } from "./colorSettings.js"

export function chartNewPieGraphic(ctx, datasForCharts, options) {
    var chart = new Chart(ctx, {
        type: "pie",
        data: datasForCharts,
        options: options,
    });
}

export function setOptionForPieGraphic(text) {
    let options = {	
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
    }
    return options
}



export function setDatasForPieGraphic(data, labels) {
    let datasForCharts = {
        labels: labels, // подпись на оси Х
        datasets: [{
            data: data, // точки для графика
            backgroundColor: [
                colorA,
                colorB
            ]
        }]
    };

    return datasForCharts;
}
