
const getM = ['DDMMYYYY', 'YYYYMMDD', 'YYMMDD', 'DDMMMYY', 'DMMMMYYYY', 'DDMMYY', 'YYMMMDD', 'YYYYMMMDD', 'DDMMMYYYY', 'DDMMMMYYYY'];
const getD = ['MDYYYY', 'MDYY', 'MMDDYY', 'MMDDYYYY', 'MMMMDYYYY', 'MMMDDYYYY', 'MMMDDYY']
const weekDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthM31 = [1, 3, 5, 7, 8, 10, 12];

// ISO timeformat 

// d vs dd vs ddd (julian day) vs dddd (day name)

// get time zone (date.getTimezoneOffset() / -60)

function formatDate(format, input = new Date) {
    let seperate1;
    let seperate2;
    const rgexD_M_Y1 = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    const rgexD_M_Y2 = /^([0-2][0-9]|(3)[0-1])(.)(((0)[0-9])|((1)[0-2]))(.)\d{4}$/i;
    const rgexD_M_Y3 = /^([0-2][0-9]|(3)[0-1])(,)(((0)[0-9])|((1)[0-2]))(,)\d{4}$/i;
    const rgexD_M_Y4 = /^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/i;

    if (rgexD_M_Y1.test(input) || rgexD_M_Y2.test(input) || rgexD_M_Y3.test(input) || rgexD_M_Y4.test(input)) {
        if (input.includes('/'))
            input = input.split('/').reverse().join('-');

        else if (input.includes(','))
            input = input.split(',').reverse().join('-');

        else if (input.includes('.'))
            input = input.split('.').reverse().join('-');

        else if (input.includes('-'))
            input = input.split('-').reverse().join('-');

        else if (input.includes(' '))
            input = input.split(' ').reverse().join('-');
    }
    else {
        if (input.includes('/'))
            input = input.split('/').join('-');

        else if (input.includes(','))
            input = input.split(',').join('-');

        else if (input.includes('.'))
            input = input.split('.').join('-');

        else if (input.includes('-'))
            input = input.split('-').join('-');

        else if (input.includes(' '))
            input = input.split(' ').join('-');
    }


    let index;
    let formatD = '';
    let formatM = '';
    let formatY = '';

    let resultD = '';
    let resultM = '';
    let resultY = '';

    let numD;
    let numM;
    let numY;

    let arr1 = format.split('').map(item => {
        return item.toUpperCase();
    });

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] === 'D') {
            numD = i;
            formatD += arr1[i];
        } else if (arr1[i] === 'M') {
            numM = i;
            formatM += arr1[i];
        } else if (arr1[i] === 'Y') {
            numY = i;
            formatY += arr1[i];
        }
    } // for

    format = arr1.filter(item => {
        return item !== '/' && item !== '.' && item !== ',' && item !== '-' && item !== ' ';
    }).join('').toUpperCase();

    const mLength = getM.length;
    const dLength = getD.length;

    for (let i = 0; i < mLength; i++) {
        if (format === getM[i])
            index = arr1.indexOf('M');
    }
    for (let i = 0; i < dLength; i++) {
        if (format === getD[i])
            index = arr1.indexOf('D');
    }

    const arr2 = arr1.slice(index);

    arr1 = arr1.splice(0, index);

    seperate1 = arr1.filter(item => {
        return item === '/' || item === '.' || item === ',' || item === '-' || item === ' ';
    }).join('');

    seperate2 = arr2.filter(item => {
        return item === ' ' || item === '-' || item === '/' || item === ',' || item === '.';
    }).join('');

    const time = new Date(input);
    const yearLong = time.getFullYear();
    const yearShort = yearLong.toString().slice(2);
    const month = time.getMonth() + 1;
    const monthString = month.toString().padStart(2, 0);
    const date = time.getDate();
    const dateString = date.toString().padStart(2, 0);
    const nameMonthShort = time.toLocaleDateString('en-US', { month: 'short' });
    const nameMonthLong = time.toLocaleDateString('en-US', { month: 'long' });

    //#region
    // switch (formatD) {
    //     case 'D': resultD = date;
    //         break;
    //     case 'DD': resultD = dateString;
    //         break;
    //     case 'DDD': '';
    //         break;
    //     case 'DDDD': '';
    //         break;
    // }
    // switch (formatM) {
    //     case 'M': resultM = month;
    //         break;
    //     case 'MM': resultM = monthString;
    //         break;
    //     case 'MMM': resultM = nameMonthShort;
    //         break;
    //     case 'MMMM': resultM = nameMonthLong;
    //         break;
    // }
    // switch (formatY) {
    //     case 'YY': resultY = yearShort;
    //         break;
    //     case 'YYYY': resultY = yearLong;
    //         break;
    // }
    //#endregion

    if (formatD === 'D') {
        resultD = date;
    } else if (formatD === 'DD') {
        resultD = dateString;
    } else if (formatD === 'DDD') {

    } else if (formatD === 'DDDD') {

    }

    if (formatM === 'M') {
        resultM = month;
    } else if (formatM === 'MM') {
        resultM = monthString;
    } else if (formatM === 'MMM') {
        resultM = nameMonthShort;
    } else if (formatM === 'MMMM') {
        resultM = nameMonthLong;
    }

    if (formatY === 'YY') {
        resultY = yearShort;
    } else if (formatY === 'YYYY') {
        resultY = yearLong;
    }

    if (numD < numM && numD < numY)
        return `${resultD}${seperate1}${resultM}${seperate2}${resultY}`;

    else if (numD > numM && numD > numY)
        return `${resultY}${seperate1}${resultM}${seperate2}${resultD}`;

    else if (numM < numD && numM < numY)
        return `${resultM}${seperate1}${resultD}${seperate2}${resultY}`;

    // part/ portion
} // formatDate

function getWeekdayName(input = new Date) {
    const time = new Date(input);
    const day = time.getDay();

    return weekDayNames[day];
} // getWeekdayName

function checkEnvironment() {
    const { userAgent } = navigator;
    const userAgentUppercased = userAgent.toUpperCase();

    // OS 
    let os = 'Other';
    if (userAgentUppercased.indexOf("WIN") != -1)
        os = "Windows";
    else if (userAgentUppercased.indexOf("MAC") != -1)
        os = "Mac";
    else if (userAgentUppercased.indexOf("ANDROID") != -1)
        os = "Android";
    else if (userAgentUppercased.indexOf("LIKE MAC") != -1)
        os = "iOS";
    else if (userAgentUppercased.indexOf("LINUX") != -1)
        os = "Linux";
    else os;
    // Browser
    let browser = 'Other'; // opera // coc coc
    if (userAgentUppercased.includes('FIREFOX/'))
        browser = 'Firefox';
    else if (userAgentUppercased.includes('EDG/'))
        browser = 'Edg';
    else if (userAgentUppercased.includes('CHROME/'))
        browser = 'Chrome';
    else if (userAgentUppercased.includes('SAFARI/'))
        browser = 'Safari';
    else browser;

    return {
        os,
        browser
    }
} // checkEnvironment

function getCurrentTime_ISOformat() {
    const newTime = new Date();
    const minutes = newTime.getMinutes();
    const hours = newTime.getHours();
    const date = newTime.getDate();
    const month = newTime.getMonth() + 1;
    const year = newTime.getFullYear();

    const help = item => item.toString().padStart(2, '0');

    return `${help(year)}-${help(month)}-${date} ${help(hours)}:${help(minutes)}`;
    // 
} // getCurrentTime_ISOformat

function getTodayDateParts() {
    const newTime = new Date();
    const date = newTime.getDate();
    const month = newTime.getMonth() + 1;
    const year = newTime.getFullYear();

    return [
        date,
        month,
        year
    ];
} // getTodayDateParts

function getTotalDaysDifferent(fromDate, toDate) {
    const secondsInADay = 24 * 60 * 60;
    const stampOfToday = (new Date(formatDate('YYYY-MM-DD', fromDate))).getTime();
    const stampOfInput = (new Date(formatDate('YYYY-MM-DD', toDate))).getTime();
    const deltaInSeconds = (stampOfInput - stampOfToday) / 1000;

    return Math.ceil(deltaInSeconds / secondsInADay);
} // getTotalDaysDifferent

function getDeadline(arrTime) {
    const monthSpecial = 2;
    let years;
    let months;
    let days;

    //#region count year, month, day.
    years = (arrTime[2] - getTodayDateParts()[2]);

    months;
    if (arrTime[1] >= (getTodayDateParts()[1]))
        months = arrTime[1] - (getTodayDateParts()[1]);
    else {
        months = 12 + arrTime[1] - (getTodayDateParts()[1]);
        years -= 1;
    } // else

    days = arrTime[0] - (getTodayDateParts()[0]);
    if (arrTime[0] - (getTodayDateParts()[0]) < 0 && arrTime[1] == (getTodayDateParts()[1])) {
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
    } else if (arrTime[0] - (getTodayDateParts()[0]) >= 0) {
        days = arrTime[0] - (getTodayDateParts()[0]);
    } else {
        monthM31.forEach(item => {
            if (getTodayDateParts()[1] == item) {
                days += 31;

                if (months <= 0) {
                    months += 12;
                    months -= 1;
                    years -= 1;
                } else {
                    months -= 1;
                }
            } else if (getTodayDateParts()[1] == monthSpecial) {
                days += 28;
                months -= 1;
            } // else if
        }); // forEach
        const monthOdd = [4, 6, 9, 11];
        monthOdd.forEach(item => {
            if (getTodayDateParts()[1] == item) {
                days += 30;
                months -= 1;
            }
        }); //forEach
    }
    // #endregion count year, month, day.

    if (getTodayDateParts()[0] == arrTime[0]) {
        days = 0;
    } // if     

    const dayStrings = arrTime.reverse().toString().replace(/,/g, '-');
    const totalDays = getTotalDaysDifferent(getCurrentTime_ISOformat(), dayStrings);

    const text =
        totalDays == -1 ?
            'Yesterday' :
            totalDays == 0 ?
                '' :
                totalDays == 1 ?
                    'Tomorrow' :
                    totalDays <= 6 ?
                        `${getTotalDaysDifferent(getCurrentTime_ISOformat(), dayStrings)} day` :
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
} // moveItem

function getIndexItem(arr, item) {
    let index = arr.indexOf(item);

    return index;
} // getIndexItem