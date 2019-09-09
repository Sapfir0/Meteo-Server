import { chartNewLineGraphic, setDatasForLineGraphic, setOptionForLineGraphic } from "./typeOfGraphics/lineGraphics.js"
import { findMaxMinArraysValues, dateToStr } from "./helpers.js"
import { criticalHighHum, criticalHighTemp, criticalLowHum, criticalLowTemp } from "./typeOfGraphics/colorSettings.js"

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
    datasForCharts = setDatasForLineGraphic(createdAtArray,temperatureInHomeArray,"Температура дома", temperatureArray, "Температура на улице", criticalLowTemp, criticalHighTemp)
    options = setOptionForLineGraphic("Температура", borders[0]*0.9, borders[1]*1.1, "°C")
    chartNewLineGraphic(temperatureGraphic, datasForCharts, options)


    borders =  findMaxMinArraysValues(humidityInHomeArray, humidityArray)
    datasForCharts = setDatasForLineGraphic(createdAtArray,humidityInHomeArray,"Влажность дома", humidityArray, "Влажность на улице", criticalLowHum, criticalHighHum)
    options = setOptionForLineGraphic("Влажность", borders[0]*0.9, borders[1]*1.1, "%"), 
    chartNewLineGraphic(humidityGraphic, datasForCharts, options)

}


