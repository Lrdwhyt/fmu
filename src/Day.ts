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

export function generateNextDay(days: Day[], nightTime: string, dayLength: number, nightLength: number, lastKnownPost: number): Day {
    if (days.length === 0) {
        const endDate = getNextNight(nightTime);
        const startDate = new Date(endDate.getTime() - dayLength * 60 * 60 * 1000);
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
function getNextNight(nightTime: string): Date {
    let nextNight: Date = new Date();
    const hoursMinutes = getTimeStringAsHoursMinutes(nightTime);
    nextNight.setHours(hoursMinutes.hours);
    nextNight.setMinutes(hoursMinutes.minutes);
    nextNight.setSeconds(59);
    nextNight.setMilliseconds(999);

    if (nextNight <= new Date()) {
        nextNight = new Date(nextNight.getTime() + 24 * 60 * 60 * 1000);
    }

    return nextNight;
}

interface HoursMinutes {
    hours: number,
    minutes: number
}

export function getTimeStringAsHoursMinutes(time: string): HoursMinutes {
    const arr = time.split(":");
    const hours = parseInt(arr[0]) % 24;
    const minutes = parseInt(arr[1]);

    return {
        hours,
        minutes
    }
}