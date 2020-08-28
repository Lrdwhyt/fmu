import { ActionContext } from 'vuex';
import { getGameData } from "@/LocalStorageManager"

interface Store {
    data: {};
}

export default {
    state: {
        data: {}
    } as Store,

    mutations: {
        setGameData(state: Store, append: any): void {
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
        rawGameData(state: Store): {} {
            return state.data;
        }
    }
}