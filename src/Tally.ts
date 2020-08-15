import { Vote, VoteTarget, VoteType } from '@/Vote';
import { Player } from './Player';
import { PhaseType } from './Phase';

export interface RawTally {
    [target: string]: RawTallyItem
}

export interface RawTallyItem {
    // raw tally item does not group together votes from the same voter
    target: VoteTarget;
    votes: Vote[]
}

export interface VoteUnvotePair {
    vote: Vote;
    unvote?: Vote;
}

export interface TallyItem extends Array<VoteUnvotePair> { }

export interface Tally {
    [target: string]: TallyItem;
}

export interface TallyWrapper {
    tally: Tally;
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

export function createFromLog(votes: Vote[], players: Player[], day: number): TallyWrapper {
    let tally: Tally = {};
    let currentVoters: UserVoteTracker = {};

    for (const vote of votes) {
        if (vote.type === VoteType.UNVOTE || vote.user in currentVoters) {
            const unvote: Vote = {
                ...vote,
                type: VoteType.UNVOTE
            }
            if (vote.user in currentVoters) {
                const index = currentVoters[vote.user].index;
                tally[currentVoters[vote.user].target][index].unvote = unvote;
                delete currentVoters[vote.user];
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
            currentVoters[vote.user] = {
                target: vote.target,
                index: tally[vote.target].length - 1
            }
        }
    }

    // sort tally by players who have the most votes
    const sortedTally: Tally = {};
    Object.keys(tally).sort((a, b) => {
        return numberVotes(tally[b]) - numberVotes(tally[a]);
    }).forEach(function(key) {
        sortedTally[key] = tally[key];
    });

    // now append players who have yet to vote
    let nonVoters: string[] = [];

    for (const player of players) {
        if (player.name in currentVoters) {
            continue;
        }

        if (player.aliases !== undefined) {
            if (player.aliases.some((alias) => alias in currentVoters)) {
                continue;
            }
        }

        if (!canVoteOnDay(player, day)) {
            continue;
        }

        nonVoters.push(player.name);
    }

    let result: TallyWrapper = {
        tally: sortedTally,
        nonvoters: nonVoters
    }

    return result;
}

function createFromVoteLog(votes: Vote[]): RawTally {
    let tally: RawTally = {};
    let currentVoters: { [user: string]: VoteTarget } = {};

    for (const vote of votes) {
        if (vote.type === VoteType.UNVOTE || vote.user in currentVoters) {
            const unvote: Vote = {
                ...vote,
                type: VoteType.UNVOTE
            }
            tally[currentVoters[vote.user]].votes.push(unvote);
        }
        if (vote.type === VoteType.VOTE) {
            if (vote.target in tally) {
                tally[vote.target].votes.push(vote);
            } else {
                tally[vote.target] = {
                    target: vote.target,
                    votes: [vote]
                }
            }
            currentVoters[vote.user] = vote.target;
        }
    }

    return tally;
}