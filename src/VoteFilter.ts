import { Vote } from '@/Vote';
import { Day, DayBoundaryType } from '@/Day';

export function filterVotesByDay(day: Day) {
    return function(vote: Vote): boolean {
        let startBoundary: DayBoundaryType = day.start.type;
        let endBoundary: DayBoundaryType = day.end.type;

        let startBoundaryFilter: boolean;
        let endBoundaryFilter: boolean;

        if (startBoundary === DayBoundaryType.DATE) {
            startBoundaryFilter = vote.time >= day.start.date;
        } else {
            startBoundaryFilter = vote.location >= day.start.post;
        }

        if (endBoundary === DayBoundaryType.DATE) {
            endBoundaryFilter = vote.time <= day.end.date;
        } else {
            endBoundaryFilter = vote.location <= day.end.post;
        }

        return startBoundaryFilter && endBoundaryFilter;
    }
}