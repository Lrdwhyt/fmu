export interface Player {
    name: string;
    team?: string;
    isAlive?: string;
    timeDied?: Phase;
    aliases?: string[];
}