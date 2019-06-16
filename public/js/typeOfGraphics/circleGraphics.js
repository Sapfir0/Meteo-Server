
export function chartNewPieGraphic(ctx, datasForCharts, options) {
    var chart = new Chart(ctx, {
        type: 'pie',
        data: datasForCharts,
        options: options,
    });
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
