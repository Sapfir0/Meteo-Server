

export function showHint(widget, str) {
    widget.innerHTML = str;
    widget.className = 'hint active';
}

export function hideHint(widget) {
    widget.innerHTML = '';
    widget.className = 'hint';
}


// export function checkValidation(widget, errorSpan, strError, checkPassword=false, compairWidget=undefined) {
//     if (widget.validity.valid) {
//         hideHint(errorSpan)
//         if(checkPassword) 
//            passwordEqualRepassword(widget, compairWidget)
//     }
//     else {
//         showHint(errorSpan, strError)
//     }
// }

// export function passwordEqualRepassword(widget, compairWidget, errorSpan, strError) {
//     if (widget.value == compairWidget.value) {
//         hideHint(compairWidget)
//         return true
//     }
//     else {
//         showHint(errorSpan, strError)
//         return false
//     }
// }



export function errorHandler(serverError, err) {
    showHint(serverError, err)
}