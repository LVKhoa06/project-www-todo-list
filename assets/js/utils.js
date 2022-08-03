// deadline = ngày hiện tại;
// switch -> if
function getTime() {
    const newTime = new Date();
    const minutes = newTime.getMinutes();
    const hours = newTime.getHours();
    const date = newTime.getDate();
    const month = newTime.getMonth() + 1;
    const year = newTime.getFullYear();

    function editTime(time) {
        return time < 10 ? `0${time}` : time;
    }
    return `${editTime(hours)}:${editTime(minutes)}.${editTime(date)}-${editTime(month)}-${year}`;
} // getTime

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
    const id = wrapper.querySelector('.item-note').dataset.index;
    const todo = appOOP.dataTodos.find(item => item.id == id);
    const monthEven = [1, 3, 5, 7, 8, 10, 12];
    const monthSpecial = 2;

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

    const setDeadlineElm = appOOP.dataTodos.find(item => item.id === id);
    const dateCreate = setDeadlineElm.date.split('.')[1].split('-');
    const dateCreateNumber = [Number(dateCreate[0]), Number(dateCreate[1]), Number(dateCreate[2])];
    const arrTimeDeadline = setDeadlineElm.deadline.split('-');
    const arrTimeDeadlineNumber = [Number(arrTimeDeadline[0]), Number(arrTimeDeadline[1]), Number(arrTimeDeadline[2])];

    let even = 0;
    let special = 0;

    if (dateCreateNumber[0] !== arrTimeDeadlineNumber[0]) {
        if (dateCreateNumber[2] !== arrTimeDeadlineNumber[2]) {

            for (let iOuter = dateCreateNumber[1]; iOuter < 13; iOuter++) {
                if (dateCreateNumber[1] > arrTimeDeadlineNumber[1]) {
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
            if (dateCreateNumber[1] < arrTimeDeadlineNumber[1]) {

                for (let i = dateCreateNumber[1]; i < arrTimeDeadlineNumber[1]; i++) {
                    monthEven.forEach(item => {
                        if (i == item)
                            even += 1;

                        else if (i == monthSpecial)
                            special = 1;
                    }); // forEach
                } // for
            } // if 
        } // if

        let years = (arrTimeDeadlineNumber[2] - dateCreateNumber[2]);

        let months;
        if (arrTimeDeadlineNumber[1] >= (dateCreateNumber[1]))
            months = arrTimeDeadlineNumber[1] - (dateCreateNumber[1]);
        else {
            months = 12 + arrTimeDeadlineNumber[1] - (dateCreateNumber[1]);
            years -= 1;
        } // else

        let days = arrTimeDeadlineNumber[0] - (dateCreateNumber[0]);
        if (arrTimeDeadlineNumber[0] - (dateCreateNumber[0]) > -1) {

            days = arrTimeDeadlineNumber[0] - (dateCreateNumber[0]);
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
                }

                else if (arrTimeDeadlineNumber[1] == monthSpecial) {
                    days += 28;
                    months -= 1;
                    special -= 1;
                }
            }); // forEach
            const monthOdd = [4, 6, 9, 11];
            monthOdd.forEach(item => {
                if (arrTimeDeadlineNumber[1] == item) {
                    days += 30;
                    months -= 1;
                }
            }); //forEach
        }

        function totalDay() {
            let allDays = 0;

            allDays = (years * 365) + (months * 30) + even + days - (special * 2);

            for (let y = dateCreateNumber[2]; y <= arrTimeDeadlineNumber[2]; y++) {
                if (y % 4 == 0) {
                    allDays += 1;
                }
            } // for
            return allDays;
        }

        if (months == 0) {
            even = 0;
            special = 0;
        }

        c('even', even, 'special', special);
        c('year', years, 'month', months, 'day', days, ':', totalDay());
        c(dateCreateNumber);
        c(arrTimeDeadlineNumber);

        if (totalDay() < 0) {
            appOOP.dataTodos.forEach(item => {
                if (item.id == id) {
                    item.outOfDate = true;
                }
            });

            Array.from(listNote.children).forEach(item => {
                if (item.dataset.index == id) {
                    item.querySelector('.item-text').style.color = 'red';
                }
            });
        } else {
            appOOP.dataTodos.forEach(item => {
                if (item.id == id) {
                    item.outOfDate = false;
                }
            });

            Array.from(listNote.children).forEach(item => {
                if (item.dataset.index == id) {
                    item.querySelector('.item-text').style.color = 'var(--text-color-1)';
                }
            });
        }
    }

    switch (totalDay()) {
        case 1: timeDeadline.innerText = 'Tomorrow';

            break;
        case 2: timeDeadline.innerText = `${totalDay()} day`;

            break;
        case 3: timeDeadline.innerText = `${totalDay()} day`;

            break;
        case 4: timeDeadline.innerText = `${totalDay()} day`;

            break;

        case 5: timeDeadline.innerText = `${totalDay()} day`;

            break;
        case 6: timeDeadline.innerText = `${totalDay()} day`;

            break;

        case 7: timeDeadline.innerText = `Next ${getDayName()}`;

            break;

        default: timeDeadline.innerText = arrTimeDeadline.toString().replace(/,/g, '-');
    } // switch

    inputDeadline.value = arrTimeDeadline.reverse().toString().replace(/,/g, '-');

    appOOP.localSet();
} // getDeadline 