

export function showHint(widget, str) {
    widget.innerHTML = str;
    widget.className = 'hint active';
}

export function hideHint(widget) {
    widget.innerHTML = '';
    widget.className = 'hint';
}
