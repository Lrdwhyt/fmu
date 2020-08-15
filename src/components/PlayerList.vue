<template>
    <div>
        <table class="player-list">
            <tr>
                <td>Name</td>
                <td>Status</td>
                <td>Died</td>
                <td>Aliases</td>
            </tr>
            <template v-for="player in players">
                <player-item :player="player" :name="player.name" :key="player.name" />
            </template>
        </table>
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
}
</script>

<style scoped>
td {
    font-weight: bold;
    padding: 0 8px;
}
</style>
