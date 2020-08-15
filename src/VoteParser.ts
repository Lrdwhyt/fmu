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

export function getVoteList(rawGameData: any, info: VoteParserInformation): Vote[] {
    const votes: Vote[] = [];
    for (const page in rawGameData) {
        for (const post in rawGameData[page]) {
            if (post === "last") {
                continue; // TODO find better way to handle this
            }
            const data: any = rawGameData[page][post];
            if (info.moderators.includes(data.user.toLowerCase())) {
                continue;
            }
            const raw = data.content.toLowerCase();
            const type = getVoteType(raw, info.voteKeyword, info.unvoteKeyword);
            const target = getVoteTarget(raw, type, info);
            if (type === VoteType.VOTE && target.target === SpecialVote.NONE) {
                continue;
            }
            let vote: Vote = {
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
        let j = raw.split(info.voteKeyword);
        let k = j.slice(-1)[0];
        k = trimChars(k, " :;.,");
        if (k.length === 0) {
            // uh-oh, nothing appears after the vote. Need to backtrack.
            if (j.length <= 2) {
                return { target: SpecialVote.NONE };
            }
            k = j.slice(-2)[0] + j.slice(-1)[0];
            k = trimChars(k, " :;.,");
        }
        const regex = /([\(\[][0-9]+[\)\]])/;
        // Match numbers in braces or brackets: [3] (5)
        if (k.match(regex)) {
            // likely part of tally
            return { target: SpecialVote.NONE };
        }
        k = trimChars(k, " :;.()[]{},");
        if (k.length === 0) {
            return { target: SpecialVote.NONE };
        }

        return matchVoteToTarget(k, info);
    }

    return { target: SpecialVote.NONE };
}

function matchVoteToTarget(str: string, info: VoteParserInformation): VoteTargetPair {
    let confidence: number = 0;
    let target: VoteTarget = str;

    for (const keyword of info.noEliminationKeywords) {
        let score = diceCoefficient(str, keyword);
        if (score > confidence) {
            confidence = score;
            target = SpecialVote.NOELIMINATION;
        }
    }

    for (const keyword of info.noVoteKeywords) {
        let score = diceCoefficient(str, keyword);
        if (score > confidence) {
            confidence = score;
            target = SpecialVote.NOVOTE;
        }
    }

    for (const player of info.players) {
        let score = diceCoefficient(str, player.name);
        if (score > confidence) {
            confidence = score;
            target = player.name;
        }

        if (player.name in info.nicknames) {
            for (const alias of info.nicknames[player.name]) {
                let score = diceCoefficient(str, alias);
                if (score > confidence) {
                    confidence = score;
                    target = player.name;
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
    let bigrams = [];
    for (let i = 0; i < str.length - 1; i++) {
        bigrams.push(str.slice(i, i + 2));
    }
    return bigrams;
}

function diceCoefficient(a: string, b: string) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a === b) {
        return 1;
    }
    let pairs1 = getBigrams(a);
    let pairs2 = getBigrams(b);
    let totalLength = pairs1.length + pairs2.length;
    let score = 0;
    for (const x in pairs1) {
        for (const y in pairs2) {
            if (pairs1[x] === pairs2[y]) {
                score++;
                pairs2.splice(parseInt(y), 1);
                break;
            }
        }
    }
    return 2 * score / totalLength;
}