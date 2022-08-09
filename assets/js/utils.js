
const monthM31 = [1, 3, 5, 7, 8, 10, 12];
const monthSpecial = 2;
let years;
let months;
let days;

// formatDate('YYYY-MM-dd')
// formatDate('dd/MM/YY') // 04/08/2022
// formatDate('dd-MM-YY') // 04-08-22
// function formatDate(format, input = today) {
//     if (input == null)
//         input = new Date();

//     return 1;
// }

function CheckOperatingSystem() {
    let NameOperatingSystem = '';
    if (navigator.userAgent.indexOf("Win") != -1) NameOperatingSystem =
        "Windows";
    if (navigator.userAgent.indexOf("Mac") != -1) NameOperatingSystem =
        "Mac";
    if (navigator.userAgent.indexOf("Linux") != -1) NameOperatingSystem =
        "Linux";
    if (navigator.userAgent.indexOf("like Mac") != -1) NameOperatingSystem =
        "iOS";
    if (navigator.userAgent.indexOf("Android") != -1) Name =
        "Android";

    return NameOperatingSystem;
}

function editTime(time) {
    return time < 10 ? `0${time}` : time;
} // editTime

function getTime() {
    const newTime = new Date();
    const minutes = newTime.getMinutes();
    const hours = newTime.getHours();
    const date = newTime.getDate();
    const month = newTime.getMonth() + 1;
    const year = newTime.getFullYear();

    return `${editTime(hours)}:${editTime(minutes)}.${editTime(date)}-${editTime(month)}-${year}`;
} // getTime

function getTimeToday() {
    const newTime = new Date();
    const date = newTime.getDate();
    const month = newTime.getMonth() + 1;
    const year = newTime.getFullYear();

    return [
        Number(editTime(date)),
        Number(editTime(month)),
        year
    ];
} // getTime2

function totalDay(dateString) {
    const secondsInADay = 24 * 60 * 60;
    const stampOfToday = (new Date()).getTime();
    const stampOfInput = (new Date(dateString)).getTime();
    const deltaInSeconds = (stampOfInput - stampOfToday) / 1000;

    return Math.ceil(deltaInSeconds / secondsInADay);
    // deadlineInDays
} // totalDay

function getDayName() {
    let dayName;
    const newDate = new Date;
    const currentDay = newDate.getDay() + 1;

    switch (currentDay) {
        case 1:
            dayName = "Sunday";
            break;
        case 2:
            dayName = "Monday";
            break;
        case 3:
            dayName = "Tuesday";
            break;
        case 4:
            dayName = "Wednesday";
            break;
        case 5:
            dayName = "Thursday";
            break;
        case 6:
            dayName = "Friday";
            break;
        case 7:
            dayName = "Saturday";
    } // switch
    return dayName;
} // getDayName

function getDeadline(arrTime) {
    //#region count year, month, day.
    years = (arrTime[2] - getTimeToday()[2]);

    months;
    if (arrTime[1] >= (getTimeToday()[1]))
        months = arrTime[1] - (getTimeToday()[1]);
    else {
        months = 12 + arrTime[1] - (getTimeToday()[1]);
        years -= 1;
    } // else

    days = arrTime[0] - (getTimeToday()[0]);
    if (arrTime[0] - (getTimeToday()[0]) < 0 && arrTime[1] == (getTimeToday()[1])) {
        years -= 1;
        months += 12;
        months -= 1;

        monthM31.forEach(item => {
            if (arrTime[1] == item) {
                days += 31;

            } else if (arrTime[1] == monthSpecial) {
                days += 28;
            } // else if
        }); // forEach
        const monthOdd = [4, 6, 9, 11];
        monthOdd.forEach(item => {
            if (arrTime[1] == item) {
                days += 30;
            }
        }); //forEach
    } else if (arrTime[0] - (getTimeToday()[0]) >= 0) {
        days = arrTime[0] - (getTimeToday()[0]);
    } else {
        monthM31.forEach(item => {
            if (getTimeToday()[1] == item) {
                days += 31;

                if (months <= 0) {
                    months += 12;
                    months -= 1;
                    years -= 1;
                } else {
                    months -= 1;
                }
            } else if (getTimeToday()[1] == monthSpecial) {
                days += 28;
                months -= 1;
            } // else if
        }); // forEach
        const monthOdd = [4, 6, 9, 11];
        monthOdd.forEach(item => {
            if (getTimeToday()[1] == item) {
                days += 30;
                months -= 1;
            }
        }); //forEach
    }
    // #endregion count year, month, day.

    if (getTimeToday()[0] == arrTime[0]) {
        days = 0;
    } // if     

    const dayStrings = arrTime.reverse().toString().replace(/,/g, '-');
    const totalDays = totalDay(dayStrings);

    const text =
        totalDays == -1 ?
            'Yesterday' :
            totalDays == 0 ?
                '' :
                totalDays == 1 ?
                    'Tomorrow' :
                    totalDays <= 6 ?
                        `${totalDay(dayStrings)} day` :
                        totalDays == 7 ?
                            `Next ${getDayName()}` :
                            `${years <= 0 ? '' : `${years} year`} ${months <= 0 ? '' : `${months} month`} ${days <= 0 ? '' : `${days} day`}`

    return {
        totalDays,
        text
    }
} // getDeadline 


function dragElm(elm) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (document.querySelector(elm.id || elm.className)) {
        /* if present, the header is where you move the DIV from:*/
        document.querySelector(elm.id || elm.className).onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elm.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elm.style.top = (elm.offsetTop - pos2) + "px";
        elm.style.left = (elm.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
} // drag elm