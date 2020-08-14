import { getGameData } from "@/LocalStorageManager"
import { ActionContext } from 'vuex';

interface Store {
    data: {};
}

export default {
    state: {
        data: {}
    } as Store,

    mutations: {
        updateGameData(state: Store, append: any) {
            state.data = {
                ...state.data,
                ...append
            }
        }
    },

    actions: {
        init(context: ActionContext<Store, any>) {
            let gameData = getGameData();
            if ("data" in gameData) {
                context.commit("updateGameData", gameData.data);
            }
        }
    },

    getters: {
        rawGameData(state: Store): {} {
            return state.data;
        }
    }
}