<template>
    <div>
        <ol class="player-list">
            <li v-for="player in players" v-bind:key="player.name">
                <player-item :name="player.name" />
            </li>
            <li>
                <input ref="newPlayer" type="text" @keyup="keyUp" />
                <button @click="addPlayer">Add</button>
            </li>
        </ol>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import PlayerItem from "./PlayerItem.vue";
import { Player } from "@/Player";

@Component({
    name: "player-list",
    components: {
        PlayerItem,
    },
})
export default class PlayerList extends Vue {
    get players(): Player[] {
        return this.$store.getters.playerList;
    }

    keyUp(e: KeyboardEvent): void {
        if (e.keyCode === 13) {
            this.addPlayer();
        }
    }

    addPlayer(): void {
        const playerName: string = (this.$refs.newPlayer as HTMLInputElement).value;
        if (playerName.length) {
            const player: Player = {
                name: playerName,
            };
            this.$store.commit("addPlayer", player);
            (this.$refs.newPlayer as HTMLInputElement).value = "";
            (this.$refs.newPlayer as HTMLInputElement).focus();
        }
    }
}
</script>

<style scoped>
ol {
    list-style: inside;
    padding: 0;
}
li {
    list-style-type: decimal-leading-zero;
    margin-bottom: 4px;
    padding: 0;
}
</style>
