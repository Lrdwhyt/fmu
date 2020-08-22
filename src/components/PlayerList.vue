<template>
    <table class="player-list">
        <tr>
            <td @click="sortByName">Name</td>
            <td @click="sortByStatus">Status</td>
            <td @click="sortByTimeOfDeath">Died</td>
            <td @click="sortByGroup">Group</td>
            <td>Aliases</td>
        </tr>
        <template v-for="player in sortedPlayers">
            <PlayerItem :player="player" :name="player.name" :key="player.name" />
        </template>
    </table>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import PlayerItem from "./PlayerItem.vue";
import { Player } from "@/Player";
import { sortByName, sortByStatus, sortByGroup, sortByTimeOfDeath } from "@/PlayerSorter";

@Component({
    name: "PlayerList",
    components: {
        PlayerItem,
    },
})
export default class PlayerList extends Vue {
    get players(): Player[] {
        return this.$store.getters.players;
    }

    get sortedPlayers(): Player[] {
        switch (this.sortField) {
            case "name":
                return this.players.sort(sortByName(this.sortOrder));

            case "status":
                return this.players.sort(sortByStatus(this.sortOrder));

            case "group":
                return this.players.sort(sortByGroup(this.sortOrder));

            case "timeOfDeath":
                return this.players.sort(sortByTimeOfDeath(this.sortOrder));

            default:
                return this.players;
        }
    }

    get sortField(): string {
        return this.$store.getters.playerSortField;
    }

    get sortOrder(): number {
        return this.$store.getters.playerSortOrder;
    }

    sortByName(): void {
        if (this.sortField === "name") {
            this.$store.commit("setPlayerSortOrder", -1 * this.sortOrder);
        } else {
            this.$store.commit("setPlayerSortField", "name");
            this.$store.commit("setPlayerSortOrder", 1);
        }
    }

    sortByStatus(): void {
        if (this.sortField === "status") {
            this.$store.commit("setPlayerSortOrder", -1 * this.sortOrder);
        } else {
            this.$store.commit("setPlayerSortField", "status");
            this.$store.commit("setPlayerSortOrder", 1);
        }
    }

    sortByTimeOfDeath(): void {
        if (this.sortField === "timeOfDeath") {
            this.$store.commit("setPlayerSortOrder", -1 * this.sortOrder);
        } else {
            this.$store.commit("setPlayerSortField", "timeOfDeath");
            this.$store.commit("setPlayerSortOrder", 1);
        }
    }

    sortByGroup(): void {
        if (this.sortField === "group") {
            this.$store.commit("setPlayerSortOrder", -1 * this.sortOrder);
        } else {
            this.$store.commit("setPlayerSortField", "group");
            this.$store.commit("setPlayerSortOrder", 1);
        }
    }
}
</script>

<style scoped>
table {
    border-collapse: collapse;
}

td {
    background-color: #dddde7;
    font-weight: bold;
    padding: 4px 8px;
}

tr:hover {
    background-color: #eaeaf0;
}
</style>
