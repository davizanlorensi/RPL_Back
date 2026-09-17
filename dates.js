var getStartOfWeek4 = (day = new Date()) => {
    let startOfWeek4 = day;
    startOfWeek4.setDate(startOfWeek4.getDate() - startOfWeek4.getDay() - 27);
    return startOfWeek4;
}

var getEndOfWeek4 = (day = new Date()) => {
    let endOfWeek4 = day;
    endOfWeek4.setDate(endOfWeek4.getDate() - endOfWeek4.getDay() - 23);
    return endOfWeek4;
}

var getStartOfWeek3 = (day = new Date()) => {
    let startOfWeek3 = day;
    startOfWeek3.setDate(startOfWeek3.getDate() - startOfWeek3.getDay() - 20);
    return startOfWeek3;
}

var getEndOfWeek3 = (day = new Date()) => {
    let endOfWeek3 = day;
    endOfWeek3.setDate(endOfWeek3.getDate() - endOfWeek3.getDay() - 16);
    return endOfWeek3;
}

var getStartOfWeek2 = (day = new Date()) => {
    let startOfWeek2 = day;
    startOfWeek2.setDate(startOfWeek2.getDate() - startOfWeek2.getDay() - 13);
    return startOfWeek2;
}

var getEndOfWeek2 = (day = new Date()) => {
    let endOfWeek2 = day;
    endOfWeek2.setDate(endOfWeek2.getDate() - endOfWeek2.getDay() - 9);
    return endOfWeek2;
}

var getStartOfWeek1 = (day = new Date()) => {
    let startOfWeek1 = day;
    startOfWeek1.setDate(startOfWeek1.getDate() - startOfWeek1.getDay() - 6);
    return startOfWeek1;
}

var getEndOfWeek1 = (day = new Date()) => {
    let endOfWeek1 = day;
    endOfWeek1.setDate(endOfWeek1.getDate() - endOfWeek1.getDay() - 2);
    return endOfWeek1;
}

var getStartOfCurrentWeek = (day = new Date()) => {
    let startOfCurrentWeek = day;
    startOfCurrentWeek.setDate(startOfCurrentWeek.getDate() - startOfCurrentWeek.getDay() + 1);
    return startOfCurrentWeek;
}

var getEndOfCurrentWeek = (day = new Date()) => {
    let endOfCurrentWeek = day;
    endOfCurrentWeek.setDate(endOfCurrentWeek.getDate() - endOfCurrentWeek.getDay() + 5);
    return endOfCurrentWeek;
}

var getStartOfMonth = (day = new Date()) => {
    let month = day;
    month.setDate(1);
    return month;
}

var getEndOfMonth = (day = new Date()) => {
    let month = day;
    month.setDate(31);
    return month;
}

var getMonday = (day = new Date()) => {
    let monday = day;
    monday.setDate(day.getDate() - day.getDay() + 1);
    return monday;
}

var getTuesday = (day = new Date()) => {
    let tuesday = day;
    tuesday.setDate(day.getDate() - day.getDay() + 2);
    return tuesday;
}

var getWednesday = (day = new Date()) => {
    let wednesday = day;
    wednesday.setDate(day.getDate() - day.getDay() + 3);
    return wednesday;
}

var getThursday = (day = new Date()) => {
    let thursday = day;
    thursday.setDate(day.getDate() - day.getDay() + 4);
    return thursday;
}

var getFriday = (day = new Date()) => {
    let friday = day;
    friday.setDate(day.getDate() - day.getDay() + 5);
    return friday;
}

let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

let today = new Date();

export { getStartOfMonth, getEndOfMonth, getStartOfWeek1, getEndOfWeek1, getStartOfWeek2, getEndOfWeek2, getStartOfWeek3, getEndOfWeek3, getStartOfWeek4, getEndOfWeek4, getStartOfCurrentWeek, getEndOfCurrentWeek, yesterday, today, getMonday, getTuesday, getWednesday, getThursday, getFriday };