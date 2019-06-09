document.addEventListener('DOMContentLoaded', start);

function start() { 
    const meteoId = document.querySelector("#meteoId")

    const options = {
        method: "post",
        body: meteoId.value
    }
    fetch("updateMeteoId", options).then(obj => {
        console.log(obj)
    })    
}