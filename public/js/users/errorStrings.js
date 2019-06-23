
export const validators = { 
    strEmailError: "Проверьте правильность введенного e-mail", 
    strPasswordError: "Пароль должен содержать более 5 символов", 
    strEventEmailError: "Вводи почту правильно", 
    strRepasswordError: "Введенные пароли не совпадают", 
    emailRegExp: new RegExp(".+@.+\\..+"),
    passwordRegExp: new RegExp(".{5,}"),
}

