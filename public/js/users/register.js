import { showHint, hideHint,  errorHandler } from "../helpers.js"
import { validators } from "./errorStrings.js"


document.addEventListener('DOMContentLoaded', start);

function start() {
    const emailError = document.querySelector('.emailError');
    const passwordError = document.querySelector('.passwordError');
    const repasswordError = document.querySelector('.repasswordError');
    const serverError = document.querySelector(".serverError")

    const email = document.getElementById('email');
    const password = document.querySelector('#password')
    const repassword = document.getElementById("repassword")
    const submitBtn = document.querySelector("#submit")


    function checkValidation(widget, errorSpan, strError, checkPassword=false) {
        if (widget.validity.valid) {
            hideHint(errorSpan)
            if(checkPassword) 
                passwordEqualRepassword()
        }
        else {
            showHint(errorSpan, strError)
        }
    }

    function passwordEqualRepassword() {
        if (password.value == repassword.value) {
            hideHint(repasswordError)
            return true
        }
        else {
            showHint(repasswordError, validators.strRepasswordError)
            return false
        }
    }



    const widgets = [email,password,repassword]
    const errorsSpans = [emailError, passwordError, repasswordError]
    const errorsStrings = [validators.strEmailError, validators.strPasswordError,validators.strRepasswordError]

    // for(let i=0; i<widgets.length;i++) { //мне не нравится эта реализация , но пусть будет
    //     widgets[i].addEventListener('input', () => {
    //         hideHint(serverError)
    //         if (widgets[i] == password || widgets[i]== repassword) {
    //             checkValidation(widgets[i],errorsSpans[i],errorsStrings[i], true)
    //         }
    //         else {
    //             checkValidation(widgets[i],errorsSpans[i],errorsStrings[i])
    //         }
    //     })
    // }

    email.addEventListener('input', () => {
        hideHint(serverError)
        checkValidation(email, emailError, validators.strEmailError)
    });

    password.addEventListener('input', () => {
        hideHint(serverError)
        checkValidation(password, passwordError, validators.strPasswordError, true, repassword)
    })


    repassword.addEventListener('input', () => {
        hideHint(serverError)
        checkValidation(repassword, repasswordError, validators.strRepasswordError, true, password)

    })



    submitBtn.addEventListener('click', () => {       
        if ( !email.value.match(validators.emailRegExp) )  { //пусть будет так
            showHint(emailError, validators.strEventEmailError)
        } else if(!password.value.match(validators.passwordRegExp) ) {
            showHint(passwordError, validators.strPasswordError)
        } else if(!repassword.value.match(validators.passwordRegExp) ) { //вторая регулярка не нужна
            showHint(repasswordError, validators.strRepasswordError)
        } else if( !passwordEqualRepassword() ) {
            showHint(passwordError, validators.strPasswordError)
        } else { // валидация на фронте пройдена, делаем запрос к серверу и смотрим на его ответ
            console.log("запрос")
            
            const options = {
                method:"post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email.value,
                    "password": password.value
                })
            }
            
            fetch("/register", options).then(response => {
                if (response.ok) {
                    document.location.href = "/datasPage"
                } else {
                    response.text().then(error => {
                        console.log(error)
                        errorHandler(serverError, error)
                    })
                }
            }).catch(err => {
                console.error(err)
            })
        }
    },
    false
);

}
