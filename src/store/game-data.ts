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
        setGameData(state: Store, append: any) {
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