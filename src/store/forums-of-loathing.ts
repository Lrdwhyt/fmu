import { getPlatform } from "@/LocalStorageManager"
import { ActionContext } from 'vuex';

interface Store {
    postsPerPage: number;
}

export default {
    state: {
        postsPerPage: 60,
    } as Store,

    mutations: {
        setPostsPerPage(state: Store, postsPerPage: number) {
            state.postsPerPage = postsPerPage;
        }
    },

    actions: {
        init(context: ActionContext<Store, any>) {
            let platformData = getPlatform();

            if ("postsPerPage" in platformData) {
                context.commit("setPostsPerPage", platformData.postsPerPage);
            }
        }
    },

    getters: {
        postsPerPage(state: Store): number {
            return state.postsPerPage;
        }
    }
}