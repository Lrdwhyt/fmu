import { Day, DayBoundaryType } from './Day';
import { PageData, GameData, PostData } from '@/GameData';

export function filterGameLogByDay(data: PageData, day: Day): PostData {
    return Object.values(data).reduce((result, current) => {
        for (const [key, value] of Object.entries(current)) {
            if (!isPostInRange(parseInt(key), new Date((value as GameData).time), day)) {
                continue;
            }
            Object.assign(result, { [key]: value });
        }
        return result;
    }, {});
}

function isPostInRange(post: number, date: Date, day: Day): boolean {
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