import Vue from 'vue'
import Vuex from 'vuex'
import ForumsOfLoathing from "./forums-of-loathing"
import GameConfig from "./game-config"
import Settings from "./settings"
import Interface from "./interface"
import GameData from "./game-data"
import Voting from "./voting"
import { saveSettings, saveGameData, saveGameInfo, saveInterfaceData, savePlatform, resetGame } from "@/LocalStorageManager"
import { getPosts, getThreadId, getThreadTitle, getCurrentPage, getFirstPoster } from "@/forums-of-loathing/Parser"


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        gameInfo: GameConfig,
        settings: Settings,
        ui: Interface,
        platform: ForumsOfLoathing,
        data: GameData,
        voting: Voting
    },

    mutations: {
    },

    actions: {
        finalInit(context) {
            if (context.getters.isGameActive) {
                context.dispatch("getGameData");
                context.dispatch("generateVoteData");
            }
        },

        startGame(context) {
            const id: number = getThreadId();
            const title: string = getThreadTitle();
            const page: number = getCurrentPage();
            context.commit("startGame");
            context.commit("addGame", { id, title });
            if (page === 1) {
                const moderator: string = getFirstPoster();
                if (moderator.length) {
                    context.commit("addModerator", moderator);
                }
            }
            context.dispatch("getGameData");
            context.dispatch("generateVoteData");
        },

        stopGame(context) {
            const id: number = getThreadId();
            context.commit("stopGame");
            context.commit("deleteGame", id);
            resetGame();
        },

        getGameData(context) {
            if (context.getters.moderatorList.length === 0) {
                return;
            }

            const pageData = getPosts({
                mods: context.getters.moderatorList.map((mod: string) => mod.toLowerCase()),
                voteKeyword: context.getters.voteKeyword.toLowerCase(),
                unvoteKeyword: context.getters.unvoteKeyword.toLowerCase()
            })
            context.commit("setGameData", pageData);
        }
    },

    plugins: [
        (store) => {
            store.subscribe((mutation, state: any) => {
                if (mutation.type in Settings.mutations) {
                    saveSettings(state.settings);
                } else if (mutation.type in GameConfig.mutations) {
                    saveGameInfo(state.gameInfo);
                } else if (mutation.type in GameData.mutations) {
                    saveGameData(state.data);
                } else if (mutation.type in Interface.mutations) {
                    saveInterfaceData(state.ui);
                } else if (mutation.type in ForumsOfLoathing.mutations) {
                    savePlatform(state.platform);
                }
            });
        }
    ]
})