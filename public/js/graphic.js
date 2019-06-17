import { chartNewBarGraphic, setOptionForBarGraphic, setDatasForBarGraphic } from "./typeOfGraphics/barGraphics.js"
import { chartNewLineGraphic, setDatasForHumidityGraphic, setOptionForLineGraphic, setDatasForTemperatureGraphic} from "./typeOfGraphics/lineGraphics.js"
import { chartNewPieGraphic, setDatasForPieGraphic, setOptionForPieGraphic } from "./typeOfGraphics/circleGraphics.js"
import { findMaxMinArrayValues, findMaxMinArraysValues } from "./helpers.js"

let datasForCharts
let options
let borders

export function createGraphics(graphicValues) {

    const temperatureGraphic = document.getElementById('temperatureGraphic').getContext('2d');
    const humidityGraphic = document.getElementById('humidityGraphic').getContext('2d');
    console.log(graphicValues)
    
    const temperatureInHomeArray = graphicValues.temperatureH;
    const humidityInHomeArray = graphicValues.humidityH;
    const createdAtArray = graphicValues.createdAt;
    const temperatureArray = graphicValues.temperature
    const humidityArray = graphicValues.humidity;

    
    for (let i = 0; i < createdAtArray.length; i++) {
        createdAtArray[i] = dateToStr(new Date(createdAtArray[i]))
    }
  
    
    borders = findMaxMinArraysValues(temperatureInHomeArray, temperatureArray)
    datasForCharts = setDatasForTemperatureGraphic(createdAtArray,temperatureInHomeArray,"Температура твоей попки", temperatureArray, "Темп на улице")
    options = setOptionForLineGraphic("Температура", borders[0]*0.9, borders[1]*1.1, "°C")
    chartNewLineGraphic(temperatureGraphic, datasForCharts, options)


    borders =  findMaxMinArraysValues(humidityInHomeArray, humidityArray)
    datasForCharts = setDatasForHumidityGraphic(createdAtArray,humidityInHomeArray,"Влажность твоей попки", humidityArray, "Влажность на улице")
    options = setOptionForLineGraphic("Влажность", borders[0]*0.9, borders[1]*1.1, "%"), 
    chartNewLineGraphic(humidityGraphic, datasForCharts, options)

}

export function createComputerGraphic(graphicValues) {
    const CPU_load_iostat_graphic = document.getElementById('CPU_load_iostat_graphic').getContext('2d');
    const CPU_load_uptime_graphic = document.getElementById('CPU_load_uptime_graphic').getContext('2d');

    var data = [graphicValues.CPU_load_iostat, 100-graphicValues.CPU_load_iostat]
    var labels = ["Занято", "Свободно"]

    datasForCharts = setDatasForPieGraphic(data, labels) 
    options = setOptionForPieGraphic("Нагруженность CPU, %")
    chartNewPieGraphic(CPU_load_iostat_graphic, datasForCharts, options )


    data = [graphicValues.CPU_currentLoad, graphicValues.CPU_15minute_load, graphicValues.CPU_5minute_load]
    labels = ["Текущая нагрузка", "5-минутная", "15-минутная"]

    borders =  findMaxMinArrayValues(data)
    datasForCharts = setDatasForBarGraphic(data, labels, "Сложные данные для убергениев. Подсказка скоро будет") 
    options = setOptionForBarGraphic("Нагруженность цпу", borders[0]*0.9, borders[1]*1.1)
    chartNewBarGraphic(CPU_load_uptime_graphic, datasForCharts, options )
}


function setOptionForGraphic(text) {
    let options = {	
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
        if(document.body.clientWidth > 600) {
            str = 'сегодня ';
        }
        else {
            str=''
        }
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