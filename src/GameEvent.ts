import { Vote } from './Vote';

export type GameEvent = Vote | GmPost;

export interface GmPost {
    location: number;
}