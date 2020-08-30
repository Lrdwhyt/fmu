import Vue from "vue"
import { Player } from "@/Player"
import { Day, DayBoundaryType } from "@/Day"
import { getGameInfo } from "@/LocalStorageManager"
import { ActionContext } from 'vuex';
import { Phase } from '@/Phase';

interface Store {
    isActive: boolean;
    moderators: string[];
    players: Player[];
    voteKeyword: string;
    unvoteKeyword: string;
    days: Day[];
    nightTime: string;
    dayLength: number;
    selectedDay: number;
    playerSortField: string;
    playerSortOrder: number;
}

export default {
    state: {
        isActive: false,
        moderators: [],
        players: [],
        voteKeyword: "vote",
        unvoteKeyword: "unvote",
        days: [],
        nightTime: "21:00",
        dayLength: 24,
        selectedDay: -1,
        playerSortField: "",
        playerSortOrder: 1
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
            const alreadyExists: boolean = state.moderators.some((moderator: string) => moderator.toLowerCase() === name.toLowerCase());
            if (!alreadyExists) {
                state.moderators.push(name);
            }
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
            const alreadyExists: boolean = state.players.some((existingPlayer: Player) => player.name.toLowerCase() === existingPlayer.name.toLowerCase());
            if (!alreadyExists) {
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
            if (state.selectedDay >= state.days.length) {
                state.selectedDay = state.days.length - 1;
            }
        },

        selectDay(state: Store, day: number): void {
            state.selectedDay = day;
        },

        setDay(state: Store, { day, data }: { day: number, data: Day }): void {
            Vue.set(state.days, day, data);
        },

        addAlias(state: Store, obj: { player: string, alias: string }) {
            const index = state.players.findIndex((player) => player.name === obj.player);
            if (index === -1) {
                return;
            }
            if (state.players[index].aliases !== undefined) {
                if (state.players[index].aliases!.indexOf(obj.alias) === -1) {
                    state.players[index].aliases!.push(obj.alias);
                }
            } else {
                Vue.set(state.players[index], "aliases", [obj.alias]);
            }
        },

        removeAlias(state: Store, obj: { player: string, alias: string }) {
            const index = state.players.findIndex((player) => player.name === obj.player);
            if (state.players[index].aliases !== undefined) {
                const aliasIndex = state.players[index].aliases!.findIndex((alias) => alias === obj.alias);
                Vue.delete(state.players[index].aliases!, aliasIndex);
            }
        },

        setDeathStatus(state: Store, obj: { player: string, isAlive: boolean, timeOfDeath: Phase }) {
            const index = state.players.findIndex((player) => player.name === obj.player);
            Vue.set(state.players[index], "isAlive", obj.isAlive);
            Vue.set(state.players[index], "timeOfDeath", obj.timeOfDeath);
        },

        changePlayerGroup(state: Store, obj: { player: string, group: string }): void {
            const index = state.players.findIndex((player) => player.name === obj.player);
            if (index !== -1) {
                Vue.set(state.players[index], "group", obj.group);
            }
        },

        setPlayerSortField(state: Store, field: string): void {
            state.playerSortField = field;
        },

        setPlayerSortOrder(state: Store, order: number): void {
            state.playerSortOrder = order;
        },

        saveNotes(state: Store, { name, content }: { name: string, content: string }): void {
            const index = state.players.findIndex((player) => player.name === name);
            if (index !== -1) {
                Vue.set(state.players[index], "notes", content);
            }
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

            if ("playerSortField" in gameData) {
                context.commit("setPlayerSortField", gameData.playerSortField);
            }

            if ("playerSortOrder" in gameData) {
                context.commit("setPlayerSortOrder", gameData.playerSortOrder);
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

        player(state: Store) {
            return (name: string): Player => {
                return state.players.find((player) => {
                    return player.name === name || player.aliases !== undefined && player.aliases.includes(name)
                }) || {
                    name: name,
                    isAlive: true
                };
            };
        },

        players(state: Store): Player[] {
            return state.players;
        },

        selectedDay(state: Store): number {
            return state.selectedDay;
        },

        playerSortField(state: Store): string {
            return state.playerSortField;
        },

        playerSortOrder(state: Store): number {
            return state.playerSortOrder;
        }
    }
}