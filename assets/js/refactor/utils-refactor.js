

function getTime() {
    const newTime = new Date();
    const minutes = newTime.getMinutes();
    const hours = newTime.getHours();
    const date = newTime.getDate();
    const month = newTime.getMonth() + 1;
    const year = newTime.getFullYear();

    function help(item) {
        return item.toString().padStart(2, '0')
    }
    return `${help(hours)}:${help(minutes)}.${help(date)}-${help(month)}-${year}`;
} // getTime

function getTimeToday() {
    const newTime = new Date();
    const date = newTime.getDate();
    const month = newTime.getMonth() + 1;
    const year = newTime.getFullYear();

    return [
        date,
        month,
        year
    ];
} // getTimeToday

function totalDay(dateString) {
    const secondsInADay = 24 * 60 * 60;
    const stampOfToday = (new Date()).getTime();
    const stampOfInput = (new Date(dateString)).getTime();
    const deltaInSeconds = (stampOfInput - stampOfToday) / 1000;

    return Math.ceil(deltaInSeconds / secondsInADay);
} // totalDay

function getDeadline(arrTime) {
    const monthM31 = [1, 3, 5, 7, 8, 10, 12];
    const monthSpecial = 2;
    let years;
    let months;
    let days;

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
                            `Next ${getWeekdayName()}` :
                            `${years <= 0 ? '' : `${years} year`} ${months <= 0 ? '' : `${months} month`} ${days <= 0 ? '' : `${days} day`}`

    return {
        totalDays,
        text
    }
} // getDeadline 

function moveItem(arr, fromIndex, toIndex) {
    const item = arr.at(fromIndex);

    // remove item from current location
    arr.splice(fromIndex, 1);
    // insert toIndex
    arr.splice(toIndex, 0, item);

    return arr;
}

function getIndexItem(arr, item) {
    let index = arr.indexOf(item);

    return index;
}