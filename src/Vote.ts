export enum VoteType {
    NONE, UNVOTE, VOTE
}

export enum SpecialVote {
    NONE = "",
    NOELIMINATION = "No elimination",
    NOVOTE = "No vote",
}

export type VoteTarget = string | SpecialVote;

export interface Vote {
    target: VoteTarget;
    type: VoteType;
    source: string;
    user: string;
    location: number;
    link: string;
    confidence?: number;
    time: Date;
}