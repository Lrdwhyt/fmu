import { Vote } from '@/Vote';

export function linkPost(vote: Vote): string {
    return `http://forums.kingdomofloathing.com/vb/showthread.php?p=${vote.link}`;
}