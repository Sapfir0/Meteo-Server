import { showHint, hideHint, errorHandler } from "../helpers.js"

import { validators } from "./errorStrings.js"



document.addEventListener("DOMContentLoaded", start);

function start() {
    const email = document.querySelector("#email");
    const emailError = document.querySelector(".emailError");
    const passwordError = document.querySelector(".passwordError");
    const serverError = document.querySelector(".serverError")

    const password = document.querySelector("#password")
    const sendBtn = document.querySelector("#submit")
    

    function checkValidation(widget, errorSpan, strError) {
        if (widget.validity.valid) {
            hideHint(errorSpan)
        }
        else {
            showHint(errorSpan, strError)
        }
    }
    
    email.addEventListener("input", () => {
        hideHint(serverError)
        checkValidation(email, emailError, validators.strEmailError)
    });

    password.addEventListener("input", () => {
        hideHint(serverError)
        checkValidation(password, passwordError, validators.strPasswordError)
    })



    sendBtn.addEventListener("click", () => {
            if ( !email.value.match(validators.emailRegExp) )  { //пусть будет так
                showHint(emailError, validators.strEventEmailError)
            }
            else if(!password.value.match(validators.passwordRegExp) ) {
                showHint(passwordError, validators.strPasswordError)
            }
            else { // валидация на фронте пройдена, делаем запрос к серверу и смотрим на его ответ
                console.log("запрос")
                const options = {
                    method:"post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "email": email.value,
                        "password": password.value
                    })
                }
                fetch("/sign_In", options).then(response => {
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
            }
        },
        false
    );
}
