import Vue from "vue"
import { Player } from "@/Player"
import { Day, DayBoundaryType } from "@/Day"
import { getGameInfo } from "@/LocalStorageManager"
import { ActionContext } from 'vuex';

interface Store {
    isActive: boolean;
    moderators: string[];
    players: Player[];
    votes: {
    };
    voteKeyword: string;
    unvoteKeyword: string;
    days: Day[];
    nightTime: string;
    dayLength: number;
    selectedDay: number;
}

export default {
    state: {
        isActive: false,
        moderators: [],
        players: [],
        voteKeyword: "vote",
        unvoteKeyword: "unvote",
        votes: {},
        days: [],
        nightTime: "21:00",
        dayLength: 24,
        selectedDay: -1
    } as Store,

    mutations: {
        setGameActive(state: Store, isActive: boolean) {
            state.isActive = isActive;
        },

        startGame(state: Store) {
            state.isActive = true;
        },

        stopGame(state: Store) {
            state.isActive = false;
        },

        addModerator(state: Store, name: string) {
            state.moderators.push(name);
        },

        removeModerator(state: Store, mod: string) {
            const index: number = state.moderators.indexOf(mod);
            Vue.delete(state.moderators, index);
        },

        setVoteKeyword(state: Store, keyword: string): void {
            state.voteKeyword = keyword;
        },

        setUnvoteKeyword(state: Store, keyword: string): void {
            state.unvoteKeyword = keyword;
        },

        setNightTime(state: Store, time: string): void {
            if (time.length > 3) {
                state.nightTime = time;
            }
        },

        setDayLength(state: Store, length: number): void {
            state.dayLength = length;
        },

        addPlayer(state: Store, player: Player) {
            const index: number = state.players.findIndex((existingPlayer: Player) => {
                return player.name.toLowerCase() === existingPlayer.name.toLowerCase()
            });
            if (index === -1) {
                state.players.push(player);
            }
        },

        removePlayer(state: Store, name: string): void {
            const index: number = state.players.findIndex((player: Player) => player.name === name);
            Vue.delete(state.players, index);
        },

        changePlayerName(state: Store, { oldName, newName }: { oldName: string, newName: string }) {
            const index: number = state.players.findIndex((player: Player) => player.name === oldName);
            state.players[index].name = newName;
        },

        addDay(state: Store, day: Day): void {
            state.days.push(day);
        },

        removeLastDay(state: Store): void {
            state.days.pop();
        },

        selectDay(state: Store, day: number): void {
            state.selectedDay = day;
        },

        setDay(state: Store, obj: { day: number, data: Day }): void {
            Vue.set(state.days, obj.day, obj.data);
        }
    },

    actions: {
        init(context: ActionContext<Store, any>) {
            const gameData: Store = getGameInfo();
            if ("isActive" in gameData) {
                context.commit("setGameActive", gameData.isActive);
            }

            if ("players" in gameData) {
                for (const player of gameData.players) {
                    context.commit("addPlayer", player);
                }
            }

            if ("moderators" in gameData) {
                for (const moderator of gameData.moderators) {
                    context.commit("addModerator", moderator);
                }
            }

            if ("voteKeyword" in gameData) {
                context.commit("setVoteKeyword", gameData.voteKeyword);
            }

            if ("unvoteKeyword" in gameData) {
                context.commit("setUnvoteKeyword", gameData.unvoteKeyword);
            }

            if ("days" in gameData) {
                for (const day of gameData.days) {
                    day.start.date = new Date(day.start.date);
                    day.end.date = new Date(day.end.date);
                    context.commit("addDay", day);
                }
            }

            if ("nightTime" in gameData) {
                context.commit("setNightTime", gameData.nightTime);
            }

            if ("dayLength" in gameData) {
                context.commit("setDayLength", gameData.dayLength);
            }

            if ("selectedDay" in gameData) {
                context.commit("selectDay", gameData.selectedDay);
            }
        },
    },

    getters: {
        isGameActive(state: Store): boolean {
            return state.isActive;
        },

        moderatorList(state: Store): string[] {
            return state.moderators;
        },

        voteKeyword(state: Store): string {
            return state.voteKeyword;
        },

        unvoteKeyword(state: Store): string {
            return state.unvoteKeyword;
        },

        nightTime(state: Store): string {
            return state.nightTime;
        },

        dayLength(state: Store): number {
            return state.dayLength;
        },

        days(state: Store) {
            return state.days;
        },

        playerList(state: Store): Player[] {
            return state.players;
        },

        selectedDay(state: Store): number {
            return state.selectedDay;
        }
    }
}