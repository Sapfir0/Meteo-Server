
const colorA = '#ffcd56'
const colorB = '#4bc0c0'

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
                colorA,
                colorB
            ]
        }]
    };

    return datasForCharts;
}
