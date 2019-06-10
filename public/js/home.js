import { errorHandler } from "./helpers.js"


document.addEventListener('DOMContentLoaded', start);

function start() { 
    const meteoId = document.querySelector("#meteoId")
    const sendBtn = document.querySelector("#submit")
    const serverError = document.querySelector(".serverError")



    sendBtn.addEventListener('click', (event) => {
        console.log(meteoId.value)

        const options = {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "meteostationId": meteoId.value
            })
     
        }
        fetch("/updateMeteoId", options).then(response => {
            if (response.ok) {
                document.location.href = "/datasPage"
            }
            else {
                response.text().then(error => {
                    console.log(error)
                    errorHandler(serverError, error)
                })
            }
        }).catch((err) => {
            console.error(err)
        })
    
},false);


}


