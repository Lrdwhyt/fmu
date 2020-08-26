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

interface VoteTracker {
    target: VoteTarget,
    index: number
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
    let currentVoters: Map<string, VoteTracker> = new Map();

    for (const vote of votes) {
        const userLowerCase: string = vote.user.toLowerCase();
        if (vote.type === VoteType.UNVOTE || currentVoters.has(userLowerCase)) {
            const unvote: Vote = {
                ...vote,
                type: VoteType.UNVOTE
            }
            if (currentVoters.has(userLowerCase)) {
                const index = currentVoters.get(userLowerCase)!.index;
                tally[currentVoters.get(userLowerCase)!.target][index].unvote = unvote;
                currentVoters.delete(userLowerCase);
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
            currentVoters.set(userLowerCase, {
                target: vote.target,
                index: tally[vote.target].length - 1
            })
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
        if (currentVoters.has(player.name.toLowerCase())) {
            continue;
        }

        if (player.aliases !== undefined) {
            if (player.aliases.some((alias) => currentVoters.has(alias.toLowerCase()))) {
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