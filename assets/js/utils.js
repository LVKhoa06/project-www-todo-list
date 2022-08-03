// deadline = ngày hiện tại;
// switch -> if

function editTime(time) {
    return time < 10 ? `0${time}` : time;
}

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

function getDeadline(e) {
    const wrapper = e.target.closest('advanced-edit');
    const textItem = wrapper.querySelector('.item-text');
    const id = wrapper.querySelector('.item-note').dataset.index;

    const monthEven = [1, 3, 5, 7, 8, 10, 12];
    const monthSpecial = 2;

    const setDeadlineElm = appOOP.dataTodos.find(item => item.id === id);
    const arrTimeDeadline = setDeadlineElm.deadline.split('-');
    const arrTimeDeadlineNumber = [Number(arrTimeDeadline[0]), Number(arrTimeDeadline[1]), Number(arrTimeDeadline[2])];

    let even = 0;
    let special = 0;

    appOOP.dataTodos = appOOP.dataTodos.map(item => {
        if (item.id !== id) {
            return item
        } else {
            return {
                ...item,
                deadline: inputDeadline.value.split('-').reverse().toString().replace(/,/g, '-')
            }
        } // else
    }) // map

    if (getTimeToday()[0] !== arrTimeDeadlineNumber[0]) {
        if (getTimeToday()[2] !== arrTimeDeadlineNumber[2]) {
            for (let iOuter = getTimeToday()[1]; iOuter < 13; iOuter++) {
                if (getTimeToday()[1] > arrTimeDeadlineNumber[1]) {
                    monthEven.forEach(item => {

                        if (iOuter == item)
                            even += 1;
                    }); // forEach

                    if (iOuter == 12) {
                        for (let iInner1 = 1; iInner1 < arrTimeDeadlineNumber[1]; iInner1++) {
                            monthEven.forEach(item => {

                                if (iInner1 == item)
                                    even += 1;

                                else if (iInner1 == monthSpecial)
                                    special = 1;
                            }); // forEach
                        } // for inner
                    } // if inner
                }
            } // for outer
            if (getTimeToday()[1] < arrTimeDeadlineNumber[1]) {
                for (let i = getTimeToday()[1]; i < arrTimeDeadlineNumber[1]; i++) {
                    monthEven.forEach(item => {
                        if (i == item)
                            even += 1;

                        else if (i == monthSpecial)
                            special = 1;
                    }); // forEach
                } // for
            } // if 
        } // if

        //#region count year, month, day.
        let years = (arrTimeDeadlineNumber[2] - getTimeToday()[2]);

        let months;
        if (arrTimeDeadlineNumber[1] >= (getTimeToday()[1]))
            months = arrTimeDeadlineNumber[1] - (getTimeToday()[1]);
        else {
            months = 12 + arrTimeDeadlineNumber[1] - (getTimeToday()[1]);
            years -= 1;
        } // else

        let days = arrTimeDeadlineNumber[0] - (getTimeToday()[0]);
        if (arrTimeDeadlineNumber[0] - (getTimeToday()[0]) > -1) {

            days = arrTimeDeadlineNumber[0] - (getTimeToday()[0]);
        } else {
            monthEven.forEach(item => {
                if (arrTimeDeadlineNumber[1] == item) {
                    days += 31;

                    if (months <= 0) {
                        months += 12;
                        months -= 1;
                        years -= 1;
                    } else {
                        months -= 1;
                    }
                    even -= 1;
                } else if (arrTimeDeadlineNumber[1] == monthSpecial) {
                    days += 28;
                    months -= 1;
                    special -= 1;
                } // else if
            }); // forEach
            const monthOdd = [4, 6, 9, 11];
            monthOdd.forEach(item => {
                if (arrTimeDeadlineNumber[1] == item) {
                    days += 30;
                    months -= 1;
                }
            }); //forEach
        }
        // #endregion count year, month, day.

        function totalDay() {
            let allDays = 0;

            allDays = (years * 365) + (months * 30) + even + days - (special * 2);

            for (let y = getTimeToday()[2]; y <= arrTimeDeadlineNumber[2]; y++) {
                if (y % 4 == 0) {
                    allDays += 1;
                }
            } // for
            return allDays;
        } // totalDay

        if (months == 0) {
            even = 0;
            special = 0;
        }

        c('even', even, 'special', special);
        c('year', years, 'month', months, 'day', days, ':', totalDay());
        c(getTimeToday());
        c(arrTimeDeadlineNumber);

        if (totalDay() < 0) {
            appOOP.dataTodos.forEach(item => {
                if (item.id == id) {
                    item.outOfDate = true;
                }
            }); // forEach

            textItem.style.color = 'red';

            Array.from(listNote.children).forEach(item => {
                if (item.dataset.index == id) {
                    item.querySelector('.item-text').style.color = 'red';
                }
            }); // Array.from
        } else {
            appOOP.dataTodos.forEach(item => {
                if (item.id == id) {
                    item.outOfDate = false;
                }
            }); // forEach

            textItem.style.color = 'var(--text-color-1)';

            Array.from(listNote.children).forEach(item => {
                if (item.dataset.index == id) {
                    item.querySelector('.item-text').style.color = 'var(--text-color-1)';
                }
            }); // Array.from
        } // else
    } // if 

    if (totalDay() == 1) {
        timeDeadline.innerText = 'Tomorrow';
    } else if (totalDay() <= 6) {
        timeDeadline.innerText = `${totalDay()} day`;
    } else if (totalDay() == 7) {
        timeDeadline.innerText = `Next ${getDayName()}`;
    } else {
        timeDeadline.innerText = arrTimeDeadline.toString().replace(/,/g, '-');
    }

    inputDeadline.value = arrTimeDeadline.reverse().toString().replace(/,/g, '-');

    appOOP.localSet();
} // getDeadline 