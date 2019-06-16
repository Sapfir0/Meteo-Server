

export function showHint(widget, str) {
    widget.innerHTML = str;
    widget.className = 'hint active';
}

export function hideHint(widget) {
    widget.innerHTML = '';
    widget.className = 'hint';
}

export function errorHandler(serverError, err) {
    showHint(serverError, err)
}

export function findMaxMinArrayValues(array) {
    const result = [ Math.min( ...array), Math.max( ...array ) ]
    result[0] = Math.round(result[0]); result[1] = Math.round(result[1])
    return result
}

export function findMaxMinArraysValues(array1, array2) {
    const minMaxInAr1 = findMaxMinArrayValues(array1)
    const minMaxInAr2 = findMaxMinArrayValues(array2)
    const sum = minMaxInAr1.concat(minMaxInAr2)
    const result = findMaxMinArrayValues(sum)
    return result
}