import Vue from "vue"
import { getSettings, resetGameById } from "@/LocalStorageManager"
import { ActionContext } from 'vuex';

interface Store {
    useColours: boolean;
    includeUnvotes: boolean;
    showPostNumbers: boolean;
    games: {
        [id: number]: string;
    },
    noEliminationKeywords: string[];
    noVoteKeywords: string[];
    nicknames: NicknameList;
    minConfidence: number;
    nightLength: number;
    groups: {
        [group: string]: string;
    };
    useManualCopy: boolean;
}

export interface NicknameList {
    [name: string]: string[];
}

const defaultGroupColour = "#000000";

export default {
    state: {
        useColours: false,
        includeUnvotes: true,
        showPostNumbers: true,
        games: {},
        noEliminationKeywords: [],
        noVoteKeywords: [],
        nicknames: {},
        minConfidence: 40,
        nightLength: 10,
        groups: {
            "none": "#000000",
            "innocent": "#448aff",
            "mafia": "#ff1744",
            "awt": "#aa00ff"
        },
        useManualCopy: false
    } as Store,

    mutations: {
        setIncludeUnvotes(state: Store, includeUnvotes: boolean) {
            state.includeUnvotes = includeUnvotes;
        },

        updateUseColours(state: Store, useColours: boolean) {
            state.useColours = useColours;
        },

        updateShowPostNumbers(state: Store, showPostNumbers: boolean) {
            state.showPostNumbers = showPostNumbers;
        },

        addGame(state: Store, { id, title }: { id: number, title: string }): void {
            Vue.set(state.games, id, title);
        },

        deleteGame(state: Store, id: number): void {
            Vue.delete(state.games, id);
        },

        addNoEliminationKeyword(state: Store, keyword: string): void {
            state.noEliminationKeywords.push(keyword.toLowerCase());
        },

        removeNoEliminationKeyword(state: Store, keyword: string): void {
            const index: number = state.noEliminationKeywords.indexOf(keyword);
            Vue.delete(state.noEliminationKeywords, index);
        },

        addNoVoteKeyword(state: Store, keyword: string): void {
            state.noVoteKeywords.push(keyword.toLowerCase());
        },

        removeNoVoteKeyword(state: Store, keyword: string): void {
            const index: number = state.noVoteKeywords.indexOf(keyword);
            Vue.delete(state.noVoteKeywords, index);
        },

        registerNewPlayer(state: Store, player: string): void {
            for (const key of Object.keys(state.nicknames)) {
                if (player.toLowerCase() === key.toLowerCase()) {
                    return;
                }
            }
            Vue.set(state.nicknames, player, []);
        },

        initialiseNicknames(state: Store, { player, nicknames }: { player: string, nicknames: string[] }): void {
            if (!(player in state.nicknames)) {
                Vue.set(state.nicknames, player, []);
            }
            for (const nickname of nicknames) {
                state.nicknames[player].push(nickname);
            }
        },

        addNicknameForPlayer(state: Store, { player, nickname }: { player: string, nickname: string }): void {
            state.nicknames[player].push(nickname);
        },

        unregisterPlayer(state: Store, player: string): void {
            Vue.delete(state.nicknames, player);
        },

        removeNickname(state: Store, { player, nickname }: { player: string, nickname: string }): void {
            const index: number = state.nicknames[player].indexOf(nickname);
            Vue.delete(state.nicknames[player], index);
        },

        setMinConfidence(state: Store, value: number): void {
            state.minConfidence = value;
        },

        setNightLength(state: Store, length: number): void {
            state.nightLength = length;
        },

        addGroup(state: Store, group: string): void {
            Vue.set(state.groups, group, defaultGroupColour);
        },

        removeGroup(state: Store, group: string): void {
            Vue.delete(state.groups, group);
        },

        changeColour(state: Store, group: { [group: string]: string }): void {
            state.groups = {
                ...state.groups,
                ...group
            }
        },

        initialiseGroups(state: Store, obj: any): void {
            Vue.set(state, "groups", obj);
        },

        setUseManualCopy(state: Store, useManualCopy: boolean): void {
            state.useManualCopy = useManualCopy;
        }
    },

    actions: {
        init(context: ActionContext<Store, any>) {
            const settingsData: Store = getSettings();
            if ("includeUnvotes" in settingsData) {
                context.commit("setIncludeUnvotes", settingsData.includeUnvotes);
            }

            if ("useColours" in settingsData) {
                context.commit("updateUseColours", settingsData.useColours);
            }

            if ("showPostNumbers" in settingsData) {
                context.commit("updateShowPostNumbers", settingsData.showPostNumbers);
            }

            if ("games" in settingsData) {
                for (const game in settingsData.games) {
                    context.commit("addGame", {
                        id: game,
                        title: settingsData.games[game]
                    });
                }
            }

            if ("noEliminationKeywords" in settingsData && settingsData.noEliminationKeywords.length > 0) {
                for (const keyword of settingsData.noEliminationKeywords) {
                    context.commit("addNoEliminationKeyword", keyword);
                }
            } else {
                context.commit("addNoEliminationKeyword", "no elimination");
                context.commit("addNoEliminationKeyword", "no lynch");
            }

            if ("noVoteKeywords" in settingsData && settingsData.noVoteKeywords.length > 0) {
                for (const keyword of settingsData.noVoteKeywords) {
                    context.commit("addNoVoteKeyword", keyword);
                }
            } else {
                context.commit("addNoVoteKeyword", "no vote");
            }

            if ("nicknames" in settingsData) {
                // sort alphabetically
                Object.keys(settingsData.nicknames).sort((a, b) => {
                    return a.toLowerCase().localeCompare(b.toLowerCase());
                }).forEach(function(key) {
                    context.commit("initialiseNicknames", {
                        player: key,
                        nicknames: settingsData.nicknames[key]
                    })
                });
            }

            if ("minConfidence" in settingsData) {
                context.commit("setMinConfidence", settingsData.minConfidence);
            }

            if ("nightLength" in settingsData) {
                context.commit("setNightLength", settingsData.nightLength);
            }

            if ("groups" in settingsData) {
                context.commit("initialiseGroups", settingsData.groups);
            }

            if ("useManualCopy" in settingsData) {
                context.commit("setUseManualCopy", settingsData.useManualCopy);
            }
        },

        deleteGame(context: ActionContext<Store, any>, id: number) {
            context.commit("deleteGame", id);
            resetGameById(id);
        }
    },

    getters: {
        activeGameList(state: Store) {
            return state.games;
        },

        includeUnvotes(state: Store): boolean {
            return state.includeUnvotes;
        },

        showPostNumbers(state: Store): boolean {
            return state.showPostNumbers;
        },

        useColours(state: Store): boolean {
            return state.useColours;
        },

        noEliminationKeywords(state: Store): string[] {
            return state.noEliminationKeywords;
        },

        noVoteKeywords(state: Store): string[] {
            return state.noVoteKeywords;
        },

        nicknames(state: Store): NicknameList {
            return state.nicknames;
        },

        minConfidence(state: Store): number {
            return state.minConfidence;
        },

        nightLength(state: Store): number {
            return state.nightLength;
        },

        groups(state: Store): { [group: string]: string } {
            return state.groups;
        },

        color(state: Store) {
            return (group: string): string => {
                return state.groups[group] || "";
            }
        },

        useManualCopy(state: Store): boolean {
            return state.useManualCopy;
        }
    }
}