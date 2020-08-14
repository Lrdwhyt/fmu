import { Player } from './Player';

export enum VoteType {
    NONE, UNVOTE, VOTE
}

export enum SpecialVote {
    NOELIMINATION = "No elimination",
    NOVOTE = "No vote",
    NONE = ""
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