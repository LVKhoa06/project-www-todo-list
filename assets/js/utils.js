
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

