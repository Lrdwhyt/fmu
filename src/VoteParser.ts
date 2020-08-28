import { Vote, VoteTarget, VoteType, SpecialVote } from "@/Vote";
import { Player } from '@/Player';
import { trimChars } from '@/StringUtils';
import { NicknameList } from './store/settings';


interface VoteParserInformation {
    players: Player[],
    moderators: string[],
    voteKeyword: string,
    unvoteKeyword: string,
    noEliminationKeywords: string[],
    noVoteKeywords: string[],
    nicknames: NicknameList,
    minConfidence: number
}

interface VoteTargetPair {
    confidence?: number;
    target: VoteTarget;
}

export function parseVotes(rawGameData: any, info: VoteParserInformation): Vote[] {
    const votes: Vote[] = [];
    for (const page of Object.keys(rawGameData)) {
        for (const post of Object.keys(rawGameData[page])) {
            if (post === "last") {
                continue; // TODO find better way to handle this
            }

            const data: any = rawGameData[page][post]; // TODO don't use any

            if (info.moderators.includes(data.user.toLowerCase())) {
                continue;
            }

            const raw = data.content.toLowerCase();
            const type = getVoteType(raw, info.voteKeyword, info.unvoteKeyword);
            const target = getVoteTarget(raw, type, info);

            if (type === VoteType.VOTE && target.target === SpecialVote.NONE) {
                continue;
            }

            const vote: Vote = {
                source: data.content,
                user: data.user,
                time: new Date(data.time),
                link: data.link,
                target: target.target,
                confidence: target.confidence,
                type: type,
                location: parseInt(post)
            }
            votes.push(vote);
        }
    }

    return votes;
}

function getVoteType(raw: string, voteKeyword: string, unvoteKeyword: string): VoteType {
    if (raw.includes(unvoteKeyword)) {
        if (!raw.includes(voteKeyword)) {
            return VoteType.UNVOTE;
        }

        const lastIndexOfVote: number = raw.lastIndexOf(voteKeyword) + voteKeyword.length;
        const lastIndexOfUnvote: number = raw.lastIndexOf(unvoteKeyword) + unvoteKeyword.length;

        if (lastIndexOfVote > lastIndexOfUnvote) {
            return VoteType.VOTE;
        } else if (lastIndexOfUnvote > lastIndexOfVote) {
            return VoteType.UNVOTE;
        } else {
            if (unvoteKeyword.includes(voteKeyword)) {
                return VoteType.UNVOTE;
            } else {
                return VoteType.VOTE;
            }
        }
    } else if (raw.includes(voteKeyword)) {
        return VoteType.VOTE;
    }

    return VoteType.NONE; // unexpected behaviour
}

function getVoteTarget(raw: string, type: VoteType, info: VoteParserInformation): VoteTargetPair {
    if (type === VoteType.VOTE) {
        const postVoteText = raw.split(info.voteKeyword);
        let rawVoteTarget = postVoteText.slice(-1)[0];
        rawVoteTarget = trimChars(rawVoteTarget, " :;.,");
        if (rawVoteTarget.length === 0) {
            // uh-oh, nothing appears after the vote. Need to backtrack.
            if (postVoteText.length <= 2) {
                return { target: SpecialVote.NONE };
            }
            rawVoteTarget = postVoteText.slice(-2)[0] + postVoteText.slice(-1)[0];
            rawVoteTarget = trimChars(rawVoteTarget, " :;.,");
        }
        const regex = /([\(\[][0-9]+[\)\]])/;
        // Match numbers in braces or brackets: [3] (5)
        if (rawVoteTarget.match(regex)) {
            // likely part of tally
            return { target: SpecialVote.NONE };
        }
        rawVoteTarget = trimChars(rawVoteTarget, " :;.()[]{},");
        if (rawVoteTarget.length === 0) {
            return { target: SpecialVote.NONE };
        }

        return getInterpretedVoteTarget(rawVoteTarget, info);
    }

    return { target: SpecialVote.NONE };
}

// try to match string of vote target to a player in game or special vote
function getInterpretedVoteTarget(str: string, info: VoteParserInformation): VoteTargetPair {
    let confidence: number = 0;
    let target: VoteTarget = str;

    for (const keyword of info.noEliminationKeywords) {
        const score = diceCoefficient(str, keyword);
        if (score > confidence) {
            confidence = score;
            target = SpecialVote.NOELIMINATION;
        }
    }

    for (const keyword of info.noVoteKeywords) {
        const score = diceCoefficient(str, keyword);
        if (score > confidence) {
            confidence = score;
            target = SpecialVote.NOVOTE;
        }
    }

    for (const player of info.players) {
        const score = diceCoefficient(str, player.name);
        if (score > confidence) {
            confidence = score;
            target = player.name;
        }

        // find player name case-insensitively
        const key = Object.keys(info.nicknames).find((key) => key.toLowerCase() === player.name.toLowerCase());

        if (key !== undefined) {
            for (const alias of info.nicknames[key]) {
                const score = diceCoefficient(str, alias);
                if (score > confidence) {
                    confidence = score;
                    target = player.name;
                }
            }
        }

        if (player.aliases !== undefined) {
            for (const alias of player.aliases) {
                const score = diceCoefficient(str, alias);
                if (score > confidence) {
                    confidence = score;
                    target = alias;
                }
            }
        }

        if (confidence === 1) {
            break;
        }
    }

    const minConfidence = info.minConfidence / 100;
    if (confidence < minConfidence) {
        confidence = 1;
        target = str;
    }

    return {
        confidence: confidence,
        target: target
    };
}

function getBigrams(str: string): string[] {
    const bigrams = [];

    for (let i = 0; i < str.length - 1; i++) {
        bigrams.push(str.slice(i, i + 2));
    }

    return bigrams;
}

function diceCoefficient(a: string, b: string) {
    const aLower = a.toLowerCase();
    const bLower = b.toLowerCase();

    if (aLower === bLower) {
        return 1;
    }

    const pairsA = getBigrams(aLower);
    let pairsB = getBigrams(bLower);
    const totalLength = pairsA.length + pairsB.length;
    let score = 0;

    for (const x in pairsA) {
        for (const y in pairsB) {
            if (pairsA[x] === pairsB[y]) {
                score++;
                pairsB.splice(parseInt(y), 1);
                break;
            }
        }
    }

    return 2 * score / totalLength;
}