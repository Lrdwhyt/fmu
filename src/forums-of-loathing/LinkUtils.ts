import { Vote } from '@/Vote';

export function linkVote(vote: Vote): string {
    return linkPost(vote.link);
}

export function linkPost(postId: string): string {
    return `http://forums.kingdomofloathing.com/vb/showthread.php?p=${postId}`;
}