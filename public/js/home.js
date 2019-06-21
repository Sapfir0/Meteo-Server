import { errorHandler } from "./helpers.js"


document.addEventListener('DOMContentLoaded', start);

function start() { 
    const meteoId = document.querySelector("#meteoId")
    const PC_Id = document.querySelector("#PC_Id")


    const sendMeteoIdBtn = document.querySelector("#sendMeteoIdBtn")
    const sendPC_IdBtn = document.querySelector("#sendPC_IdBtn")    
    const oldDescrIconsCheckBox = document.querySelector("#oldDescrIcons")

    const serverError = document.querySelector(".serverError")



 



    oldDescrIconsCheckBox.addEventListener('click', (event) => {
        
        console.log( oldDescrIconsCheckBox.checked)
        const options = {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "oldWeatherDescriptionIcons": oldDescrIconsCheckBox.checked
            })
        }

        fetch("/applySettings", options).then(response => {
            if (response.ok) {
                console.log(response)
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


    sendMeteoIdBtn.addEventListener('click', (event) => {

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

    sendPC_IdBtn.addEventListener('click', (event) => {
    console.log(sendPC_IdBtn.value)

    const options = {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "PC_Id": PC_Id.value
        })
 
    }
    fetch("/updatePC_Id", options).then(response => {
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


