import { Vote, VoteTarget, VoteType } from '@/Vote';
import { Player } from './Player';
import { PhaseType } from './Phase';

export interface VoteUnvotePair {
    vote: Vote;
    unvote?: Vote;
}

export interface TallyItem extends Array<VoteUnvotePair> { }

export interface VoteTally {
    [target: string]: TallyItem;
}

export interface FullTally {
    tally: VoteTally;
    nonvoters: string[]
}

interface UserVoteTracker {
    [user: string]: {
        target: VoteTarget,
        index: number
    }
}

export function numberVotes(item: TallyItem): number {
    return item.filter((pair) => !("unvote" in pair)).length;
}

function canVoteOnDay(player: Player, day: number): boolean {
    if (player.isAlive || player.timeOfDeath === undefined) {
        return true;
    }

    if (player.timeOfDeath.type === PhaseType.NIGHT) {
        return player.timeOfDeath.index >= day;
    } else if (player.timeOfDeath.type === PhaseType.DAY) {
        return player.timeOfDeath.index > day;
    }

    return false; // should not be reached
}

// generate tally from array of Vote objects
export function createFromLog(votes: Vote[], players: Player[], day: number): FullTally {
    let tally: VoteTally = {};
    let currentVoters: UserVoteTracker = {};

    for (const vote of votes) {
        const userLowerCase: string = vote.user.toLowerCase();
        if (vote.type === VoteType.UNVOTE || userLowerCase in currentVoters) {
            const unvote: Vote = {
                ...vote,
                type: VoteType.UNVOTE
            }
            if (userLowerCase in currentVoters) {
                const index = currentVoters[userLowerCase].index;
                tally[currentVoters[userLowerCase].target][index].unvote = unvote;
                delete currentVoters[userLowerCase];
            } else {
                // if user is not in currentVoters, we should probably ignore
                // the vote since we do not know the target (unless specified)
                /*
                tally[vote.target].push({
                    vote: unvote
                })
                */
            }
        }
        if (vote.type === VoteType.VOTE) {
            if (vote.target in tally) {
                tally[vote.target].push({
                    vote: vote
                });
            } else {
                tally[vote.target] = [{
                    vote
                }]
            }
            currentVoters[userLowerCase] = {
                target: vote.target,
                index: tally[vote.target].length - 1
            }
        }
    }

    // sort tally in order of targets with most votes to least
    const sortedTally: VoteTally = {};
    Object.keys(tally).sort((a, b) => {
        return numberVotes(tally[b]) - numberVotes(tally[a]);
    }).forEach(function(key) {
        sortedTally[key] = tally[key];
    });

    // now append players who have yet to vote
    let nonVoters: string[] = [];

    for (const player of players) {
        if (player.name.toLowerCase() in currentVoters) {
            continue;
        }

        if (player.aliases !== undefined) {
            if (player.aliases.some((alias) => alias.toLowerCase() in currentVoters)) {
                continue;
            }
        }

        if (!canVoteOnDay(player, day)) {
            // exclude dead players from non-voter list
            continue;
        }

        nonVoters.push(player.name);
    }

    let result: FullTally = {
        tally: sortedTally,
        nonvoters: nonVoters
    }

    return result;
}