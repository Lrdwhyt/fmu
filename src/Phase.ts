export enum PhaseType {
    OTHER = "",
    DAY = "day",
    NIGHT = "night"
}

export interface Phase {
    type: PhaseType;
    index: number;
}