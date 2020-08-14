import { TallyWrapper, numberVotes } from '@/Tally';
import { VoteType, Vote } from '@/Vote';
import { Day, DayBoundaryType } from './Day';

export function writeBbcode(tally: TallyWrapper): string {
    let bbcode: string = "";
    for (const item in tally.tally) {
        const tallyItem = tally.tally[item];
        bbcode += `[b]${item} (${numberVotes(tallyItem)}[b][/b])[/b] - [size=1]`;
        for (const pair of tallyItem) {
            let userVote: string = `${pair.vote.user} (#${linkVote(pair.vote)}`;
            if ("unvote" in pair) {
                userVote += "-" + linkVote(pair.unvote!);
            }
            userVote += "[b][/b])";
            if (pair.vote.type === VoteType.UNVOTE || "unvote" in pair) {
                // TODO add check if we want to disable showing unvotes
                userVote = strikeOut(userVote);
            }
            bbcode += userVote + ", ";
        }
        bbcode = bbcode.slice(0, -2);
        bbcode += "[/size]";
        bbcode += "\n";
    }

    if (tally.nonvoters.length > 0) {
        bbcode += "\n";
        bbcode += "[b]Failed to vote (" + tally.nonvoters.length + "[b][/b])[/b] - ";
        for (const player of tally.nonvoters) {
            bbcode += player + ", ";
        }
        bbcode = bbcode.slice(0, -2);
    }

    return bbcode;
}

function linkVote(vote: Vote): string {
    return `[post="${vote.link}"]${vote.location}[/post]`
}

function strikeOut(string: string): string {
    return `[s]${string}[/s]`;
}

export function header(index: number, day: Day): string {
    let start = "";
    let end = "";
    if (day.start.type === DayBoundaryType.POST) {
        start = `post #${day.start.post}`;
    } else {
        start = day.start.date.toISOString().substr(0, 16) + " UTC";
    }

    if (day.end.type === DayBoundaryType.POST) {
        end = `post #${day.end.post}`;
    } else {
        end = day.end.date.toISOString().substr(0, 16) + " UTC";
    }

    let result = `[b]Day ${index}[/b]
Tally generated from ${start} to ${end} via Forum Mafia Utilities\n\n`;

    return result;
}