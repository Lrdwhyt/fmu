import { getTimeZone } from '@/forums-of-loathing/Parser';

export enum DayBoundaryType {
    POST, DATE
}

export interface Day {
    start: {
        type: DayBoundaryType
        post: number,
        date: Date
    },
    end: {
        type: DayBoundaryType
        post: number,
        date: Date
    }
}

export function generateNext(days: Day[], nightTime: string, dayLength: number, nightLength: number, lastKnownPost: number): Day {
    if (!days.length) {
        let endDate = getNextDate(nightTime);
        let startDate = new Date(endDate.getTime() - dayLength * 60 * 60 * 1000);
        return {
            start: {
                type: DayBoundaryType.POST,
                post: 1,
                date: startDate
            },
            end: {
                type: DayBoundaryType.DATE,
                post: lastKnownPost,
                date: endDate
            }
        }
    }

    const lastDay: Day = days.slice(-1)[0];
    const newStartPost: number = lastDay.end.post + 1;
    const newEndPost: number = Math.max(newStartPost + 1, lastKnownPost);

    return {
        start: {
            type: lastDay.end.type,
            post: newStartPost,
            date: new Date(lastDay.end.date.getTime() + nightLength * 60 * 1000)
        },
        end: {
            type: DayBoundaryType.DATE,
            post: newEndPost,
            date: new Date(lastDay.end.date.getTime() + dayLength * 60 * 60 * 1000)
        }
    }
}

// get next Date at which time = nightTime
function getNextDate(nightTime: string): Date {
    let nextDate: Date = new Date();
    const hoursMinutes = getTimeStringAsHoursMinutes(nightTime);
    nextDate.setHours(hoursMinutes.hours);
    nextDate.setMinutes(hoursMinutes.minutes);
    nextDate.setSeconds(0);
    nextDate.setMilliseconds(0);

    if (nextDate <= new Date()) {
        nextDate = new Date(nextDate.getTime() + 24 * 60 * 60 * 1000);
    }

    return nextDate;
}

export function getTimeStringAsHoursMinutes(time: string) {
    const arr = time.split(":");
    const minutes = parseInt(arr[1]);
    const hours = parseInt(arr[0]) % 24;

    return {
        hours,
        minutes
    }
}