

export function showHint(widget, str) {
    widget.innerHTML = str;
    widget.className = 'hint active';
}

export function hideHint(widget) {
    widget.innerHTML = '';
    widget.className = 'hint';
}


export function checkValidation(widget, errorSpan, strError, checkPassword=false) {
    if (widget.validity.valid) {
        hideHint(errorSpan)
        if(checkPassword) 
            passwordEqualRepassword()
    }
    else {
        showHint(errorSpan, strError)
    }
}

export function passwordEqualRepassword() {
    if (password.value == repassword.value) {
        hideError(repasswordError)
        return true
    }
    else {
        showError(repasswordError, validators.strRepasswordError)
        return false
    }
}



export function errorHandler(err) {
    showHint(serverError, err)
}