

export function showHint(widget, str) {
    widget.innerHTML = str;
    widget.className = 'error active';
}

export function hideHint(widget) {
    widget.innerHTML = '';
    widget.className = 'error';
}
