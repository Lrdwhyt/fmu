import { offsetDate } from "@/DateUtils"

const monthNameMap: { [month: string]: number } = {
    "jan": 0,
    "feb": 1,
    "mar": 2,
    "apr": 3,
    "may": 4,
    "jun": 5,
    "jul": 6,
    "aug": 7,
    "sep": 8,
    "oct": 9,
    "nov": 10,
    "dec": 11
};

export function parseDate(raw: string, timeZone: number): Date {
    raw = raw.replace(/,/g, "");
    let date = new Date();
    const stringArr = raw.split(" ");
    const timeArr = stringArr.slice(-2);
    const time = timeArr[0].split(":");
    const minutes = parseInt(time[1]);
    let hours = parseInt(time[0]);
    if (timeArr[1] === "PM" && hours <= 11) {
        hours += 12;
    } else if (hours === 12 && timeArr[1] === "AM") {
        hours -= 12;
    }
    date.setUTCHours(hours);
    date.setUTCMinutes(minutes);
    let dateToday = new Date();
    if (stringArr[0] === "Today") {
        const relativeDate = offsetDate(dateToday, 0, timeZone);
        date.setUTCFullYear(relativeDate.getUTCFullYear());
        date.setUTCMonth(relativeDate.getUTCMonth());
        date.setUTCDate(relativeDate.getUTCDate());
    } else if (stringArr[0] === "Yesterday") {
        const relativeDate = offsetDate(dateToday, -1, timeZone); //Get yesterday's date in current time zone
        date.setUTCFullYear(relativeDate.getUTCFullYear());
        date.setUTCMonth(relativeDate.getUTCMonth());
        date.setUTCDate(relativeDate.getUTCDate());
    } else {
        const dateArr = stringArr.slice(1, -2);
        const month = monthNameMap[dateArr[0].toLowerCase()];
        const day = parseInt(dateArr[1].replace("s", "").replace("t", "").replace("h", "").replace("r", "").replace("n", "").replace("d", ""));
        date.setUTCDate(day);
        date.setUTCMonth(month);
        date.setUTCFullYear(parseInt(dateArr[2]));
    }

    date = offsetDate(date, 0, -timeZone); //Converting to UTC time

    return date;
}