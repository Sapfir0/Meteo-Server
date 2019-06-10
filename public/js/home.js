document.addEventListener('DOMContentLoaded', start);

function start() { 
    const meteoId = document.querySelector("#meteoId")
    const sendBtn = document.querySelector("#submit")

    const options = {
        method: "post",
        body: meteoId.value
    }

    sendBtn.addEventListener('click', (event) => {
        console.log("запрос")

        fetch("/sign_In", options).then(response => {
            if (response.ok) {
                document.location.href = "/datasPage"
            }
            else {
                errorHandler(response.text().then(errorHandler))
            }
        }).catch((err) => {
            console.error(err)
        })
    
},false);




}


