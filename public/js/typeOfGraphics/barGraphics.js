
const colorA='#ffcd56'
const colorB='#4bc0c0'
const colorC='#2e98b0'
const font_color = 'white'

export function setDatasForBarGraphic(data, labels, label) {
    let datasForCharts = {
        labels: labels, // подпись на оси Х
        
        datasets: [{
            label: label, // подпись самого графика
            data: data, // точки для графика
            backgroundColor: [
                colorA,
                colorB,
                colorC
            ]
        }]
    };
    return datasForCharts;
}



export function chartNewBarGraphic(ctx, datasForCharts, options) {
    var chart = new Chart(ctx, {
        type: 'bar',
        data: datasForCharts,
        options: options
    });
}

export function setOptionForBarGraphic(text, ymin=SuggestedMin, ymax=SuggestedMax) {
    let options = {	
        responsive: true,
        title: {
            display: true,
            text: text,
            fontColor: font_color

        },
        legend: {
            display: true,
            labels: {
                fontColor: font_color
            }
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: Math.round(ymin),
                    max: Math.round(ymax),
                    fontColor: font_color
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: font_color
                }
            }]
        },
   
    }
    return options
}