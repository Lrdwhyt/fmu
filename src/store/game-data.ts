import { ActionContext } from 'vuex';
import { getGameData } from "@/LocalStorageManager"
import { PageData } from '@/GameData';

interface Store {
    data: PageData;
}

export default {
    state: {
        data: {}
    } as Store,

    mutations: {
        setGameData(state: Store, append: PageData): void {
            state.data = {
                ...state.data,
                ...append
            }
        }
    },

    actions: {
        init(context: ActionContext<Store, any>): void {
            const gameData = getGameData();
            if ("data" in gameData) {
                context.commit("setGameData", gameData.data);
            }
        }
    },

    getters: {
        rawGameData(state: Store): PageData {
            return state.data;
        }
    }
}