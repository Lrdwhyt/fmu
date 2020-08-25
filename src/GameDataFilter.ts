import { Day, DayBoundaryType } from './Day';

interface GameData {
    user: string;
    content: string;
    link: number;
    time: Date;
}

interface PageData {
    [post: number]: GameData
}

interface TotalData {
    [page: number]: PageData
}

export function filterGameLog(data: TotalData, day: Day) {
    return Object.values(data).reduce((result, current) => {
        for (const [key, value] of Object.entries(current)) {
            if (!inBounds(parseInt(key), new Date((value as GameData).time), day)) {
                continue;
            }
            Object.assign(result, { [key]: value });
        }
        return result;
    }, {});
}

function inBounds(post: number, date: Date, day: Day): boolean {
    let startBoundaryFilter: boolean = true;
    let endBoundaryFilter: boolean = true;

    if (day.start.type === DayBoundaryType.DATE) {
        startBoundaryFilter = date >= day.start.date;
    } else {
        startBoundaryFilter = post >= day.start.post;
    }

    if (day.end.type === DayBoundaryType.DATE) {
        endBoundaryFilter = date <= day.end.date;
    } else {
        endBoundaryFilter = post <= day.end.post;
    }

    return startBoundaryFilter && endBoundaryFilter;
}