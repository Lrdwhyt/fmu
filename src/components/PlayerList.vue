<template>
    <table class="player-list">
        <tr>
            <td>Name</td>
            <td>Group</td>
            <td>Status</td>
            <td>Died</td>
            <td>Aliases</td>
        </tr>
        <template v-for="player in players">
            <player-item :player="player" :name="player.name" :key="player.name" />
        </template>
    </table>
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
}
</script>

<style scoped>
table {
    border-collapse: collapse;
}

td {
    background-color: #bdbace;
    font-weight: bold;
    padding: 4px 8px;
}
</style>
