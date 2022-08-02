// tomorrow
// 2-6 days
// next Wednesday
// 2022-08-30
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
    const todo = appOOP.dataTodos.find(entry => entry.id === id);
    const monthEven = [1, 3, 5, 7, 8, 10, 12];
    const monthOdd = [4, 6, 9, 11];
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
    const TimeDeadline = setDeadlineElm.deadline.split('-');

    let even = 0;
    let odd = 0;
    let special = 0;

    if (dateCreate[2] !== TimeDeadline[2]) {
        for (let iOuter = Number(dateCreate[1]); iOuter < 13; iOuter++) {
            monthEven.forEach(item => {

                if (iOuter == item)
                    even += 1;
            }); // forEach

            monthOdd.forEach(item => {

                if (iOuter == item)
                    odd += 1;
            }); // forEach

            if (iOuter == 12) {
                for (let iInner1 = 1; iInner1 < TimeDeadline[1]; iInner1++) {
                    monthEven.forEach(item => {

                        if (iInner1 == item)
                            even += 1;

                        else if (iInner1 == monthSpecial)
                            special = 1;
                    }); // forEach

                    monthOdd.forEach(item => {

                        if (iInner1 == item)
                            odd += 1;
                    }); //forEach
                } // for inner
            } // if inner
        } // for outer
    } else {
        for (let iOuter = Number(dateCreate[1]); iOuter < Number(TimeDeadline[1]); iOuter++) {
            monthEven.forEach(item => {

                if (iOuter == item)
                    even += 1;
            }); // forEach

            monthOdd.forEach(item => {

                if (iOuter == item)
                    odd += 1;
            }); // forEach
        } // for 
    } // else

    let years = (Number(TimeDeadline[2]) - Number(dateCreate[2]));

    let months;
    if (Number(TimeDeadline[1]) >= (Number(dateCreate[1])))
        months = Number(TimeDeadline[1]) - (Number(dateCreate[1]));
    else {
        months = 12 + Number(TimeDeadline[1]) - (Number(dateCreate[1]));
        years -= 1;
    } // else
    let days = Number(TimeDeadline[0]) - (Number(dateCreate[0]));
    if (Number(TimeDeadline[0]) - (Number(dateCreate[0])) > 0) {
        // c('1')
        days = Number(TimeDeadline[0]) - (Number(dateCreate[0]));
    } else {
        // c('2')
        monthEven.forEach(item => {

            if (Number(TimeDeadline[1]) == item) {
                days += 31;
                months -= 1;
                even -= 1;
            }

            else if (Number(TimeDeadline[1]) == monthSpecial) {
                days += 28;
                months -= 1;
                special -= 1;
            }

        }); // forEach

        monthOdd.forEach(item => {
            if (Number(TimeDeadline[1]) == item) {
                days += 30;
                months -= 1;
                odd -= 1;
            }
        }); //forEach
    }

    // not included leap year

    function totalDay() {
        let allDays = 0;

        allDays = (years * 365) + (even * 31) + (odd * 30) + (special * 28) + days;

        for (let y = Number(dateCreate[2]); y <= Number(TimeDeadline[2]); y++) {
            if (y % 4 == 0) {
                allDays += 1;
            }
        } // for
        return allDays;
    }

    c('even', even, 'odd', odd, 'special', special);
    c('year', years, 'month', months, 'day', days, ':', totalDay());
    c(dateCreate);
    c(TimeDeadline);

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

        default: timeDeadline.innerText = todo.deadline;
    } // switch

    appOOP.localSet();
} // getDeadline 




