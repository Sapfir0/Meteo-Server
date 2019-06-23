

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


//это не хорошо, но готовые функции есть только для инглиша
export function dateToStr(date) {
    const now = new Date();
    let str;
    const nearlyDay =
        date.getYear() == now.getYear() && date.getMonth() == now.getMonth();
    const subDay = now.getDate() - date.getDate();

    if (nearlyDay && subDay == 1) {
        // вчера
        str = 'вчера ';
    } else if (nearlyDay && subDay == 0) {
        // сегодня
        if(document.body.clientWidth > 600) {
            str = 'сегодня ';
        }
        else {
            str=''
        }
    } else {
        const month = ['Января','Февраля','Марта','Апреля','Мая',
            'Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря'
        ];
        str = `${date.getDate()} ${
            month[date.getMonth() - 1]
        } ${date.getFullYear()}`;
    }

    str += ' в ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    return str;
}


export function getTimeFromUnixTime(unixTimestamp, seconds=false) {
    const date = new Date(unixTimestamp*1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();

    let formattedTime = hours + ':' + minutes.substr(-2) ;
    if(seconds) {
        const seconds = "0" + date.getSeconds();
        formattedTime += ':' + seconds.substr(-2)
    }
    
    return formattedTime
}


export function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}