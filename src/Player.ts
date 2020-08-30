import { Phase } from '@/Phase';

export interface Player {
    name: string;
    isAlive: boolean;
    timeOfDeath?: Phase;
    aliases?: string[];
    group?: string;
    notes?: string;
}