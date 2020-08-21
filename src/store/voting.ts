import { Vote, VoteType, VoteTarget } from "@/Vote"
import { ActionContext } from 'vuex'
import { reset } from '@/LocalStorageManager';
import { Player } from '@/Player';
import { getVoteList } from '@/VoteParser';

interface Store {
    votes: Vote[]
}

export default {
    state: {
        votes: []
    },

    mutations: {
        addVote(state: Store, vote: Vote) {
            state.votes.push(vote);
        },

        reset(state: Store) {
            state.votes = [];
        }
    },

    actions: {
        generateVoteData(context: ActionContext<Store, any>): void {
            context.commit("reset");
            const votes: Vote[] = getVoteList(context.rootGetters.rawGameData, {
                players: context.rootGetters.players,
                moderators: context.rootGetters.moderatorList.map((mod: string) => mod.toLowerCase()),
                voteKeyword: context.rootGetters.voteKeyword,
                unvoteKeyword: context.rootGetters.unvoteKeyword,
                noEliminationKeywords: context.rootGetters.noEliminationKeywords,
                noVoteKeywords: context.rootGetters.noVoteKeywords,
                nicknames: context.rootGetters.nicknames,
                minConfidence: context.rootGetters.minConfidence
            });

            for (const vote of votes) {
                context.commit("addVote", vote);
            }
        }
    },

    getters: {
        voteLog(state: Store): Vote[] {
            return state.votes;
        }
    }
}