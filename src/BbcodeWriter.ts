import { FullTally, numberVotes, VoteUnvotePair } from '@/Tally';
import { VoteType, Vote } from '@/Vote';
import { Day, DayBoundaryType } from '@/Day';
import { Player } from '@/Player';

export interface TallyOptions {
    players: Player[];
    groups: { [group: string]: string };
    includeUnvotes: boolean;
    useColours: boolean;
    showPostNumbers: boolean;
}

export function writeBbcode(tally: FullTally, options: TallyOptions): string {
    let bbcode: string = "";
    for (const item in tally.tally) {
        const tallyItem = tally.tally[item];
        if (!options.includeUnvotes && numberVotes(tallyItem) === 0) {
            continue;
        }
        bbcode += `[b]${item} (${numberVotes(tallyItem)}[b][/b])[/b] - [size=1]`;
        for (const pair of tallyItem) {
            let userVote: string = pair.vote.user;
            if (options.useColours) {
                const player = options.players.find((player) => player.name.toLowerCase() === pair.vote.user.toLowerCase());
                if (player !== undefined) {
                    const group = player.group || "none";
                    const colour = options.groups[group] || "";
                    if (colour.length) {
                        userVote = colourText(userVote, colour);
                    }
                }
            }
            if (options.showPostNumbers) {
                userVote += `(#${linkVote(pair.vote)}`;
                if ("unvote" in pair) {
                    userVote += "-" + linkVote(pair.unvote!);
                }
                userVote += "[b][/b])";
            }
            if (hasUnvote(pair)) {
                if (!options.includeUnvotes) {
                    continue;
                }
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

function hasUnvote(pair: VoteUnvotePair): boolean {
    return pair.vote.type === VoteType.UNVOTE || "unvote" in pair;
}

function linkVote(vote: Vote): string {
    return `[post="${vote.link}"]${vote.location}[/post]`
}

function strikeOut(string: string): string {
    return `[s]${string}[/s]`;
}
function colourText(string: string, colour: string): string {
    return `[color=${colour}]${string}[/color]`;
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