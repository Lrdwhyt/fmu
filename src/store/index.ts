import Vue from 'vue'
import Vuex from 'vuex'
import ForumsOfLoathing from "./forums-of-loathing"
import GameConfig from "./game-config"
import Settings from "./settings"
import Interface from "./interface"
import GameData from "./game-data"
import Voting from "./voting"
import { saveSettings, saveGameData, saveGameInfo, saveInterfaceData, savePlatform, resetGame } from "@/LocalStorageManager"
import { getPosts, getThreadId, getThreadTitle } from "@/forums-of-loathing/Parser"


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
                context.dispatch("updateGameData");
                context.dispatch("generate", context.getters.rawGameData);
            }
        },

        startGame(context) {
            const id: number = getThreadId();
            const title: string = getThreadTitle();
            context.commit("startGame");
            context.commit("addGame", { id, title });
            context.dispatch("updateGameData");
            context.dispatch("generate", context.getters.rawGameData);
        },

        stopGame(context) {
            const id: number = getThreadId();
            context.commit("stopGame");
            context.commit("deleteGame", id);
            resetGame();
        },

        updateGameData(context) {
            context.commit("updateGameData", getPosts({
                mods: context.getters.moderatorList.map((mod: string) => mod.toLowerCase()),
                voteKeyword: context.getters.voteKeyword.toLowerCase(),
                unvoteKeyword: context.getters.unvoteKeyword.toLowerCase()
            }));
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