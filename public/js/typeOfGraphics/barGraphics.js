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
            text: text
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: Math.round(ymin),
                    max: Math.round(ymax)
                }
            }]
        },
   
    }
    return options
}