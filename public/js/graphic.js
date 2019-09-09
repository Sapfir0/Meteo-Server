import { chartNewBarGraphic, setOptionForBarGraphic, setDatasForBarGraphic } from "./typeOfGraphics/barGraphics.js"
import { chartNewLineGraphic, setDatasForHumidityGraphic, setOptionForLineGraphic, setDatasForTemperatureGraphic} from "./typeOfGraphics/lineGraphics.js"
import { chartNewPieGraphic, setDatasForPieGraphic, setOptionForPieGraphic } from "./typeOfGraphics/circleGraphics.js"
import { findMaxMinArrayValues, findMaxMinArraysValues, dateToStr } from "./helpers.js"
import { criticalHighHum, criticalHighTemp, criticalLowHum, criticalLowTemp } from "./typeOfGraphics/colorSettings"

let datasForCharts
let options
let borders

export function createGraphics(graphicValues) {

    const temperatureGraphic = document.getElementById("temperatureGraphic").getContext("2d");
    const humidityGraphic = document.getElementById("humidityGraphic").getContext("2d");
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
    datasForCharts = setDatasForTemperatureGraphic(createdAtArray,temperatureInHomeArray,"Температура дома", temperatureArray, "Температура на улице", criticalLowTemp, criticalHighTemp)
    options = setOptionForLineGraphic("Температура", borders[0]*0.9, borders[1]*1.1, "°C")
    chartNewLineGraphic(temperatureGraphic, datasForCharts, options)


    borders =  findMaxMinArraysValues(humidityInHomeArray, humidityArray)
    datasForCharts = setDatasForHumidityGraphic(createdAtArray,humidityInHomeArray,"Влажность дома", humidityArray, "Влажность на улице", criticalLowHum, criticalHighHum)
    options = setOptionForLineGraphic("Влажность", borders[0]*0.9, borders[1]*1.1, "%"), 
    chartNewLineGraphic(humidityGraphic, datasForCharts, options)

}

export function createComputerGraphic(graphicValues) {
    const CPU_load_iostat_graphic = document.getElementById("CPU_load_iostat_graphic").getContext("2d");
    const CPU_load_uptime_graphic = document.getElementById("CPU_load_uptime_graphic").getContext("2d");

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

