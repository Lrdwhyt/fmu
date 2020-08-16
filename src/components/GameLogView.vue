<template>
    <table>
        <game-log-item v-for="(vote, i) in votes" v-bind:key="i" :index="i" :event="vote" />
    </table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import GameLogItem from "./GameLogItem.vue";
import { Vote, VoteType } from "@/Vote";
import { Day } from "@/Day";
import { filterByDay } from "@/VoteFilter";

@Component({
    name: "game-log-view",
    components: {
        GameLogItem,
    },
})
export default class GameLogView extends Vue {
    get selectedDay(): number {
        return this.$store.getters.selectedDay;
    }

    get day(): Day {
        return this.$store.getters.days[this.selectedDay];
    }

    get votes() {
        const rawData = this.$store.getters.rawGameData;
        let result = {};
        for (const page in rawData) {
            result = {
                ...result,
                ...rawData[page],
            };
        }
        return result;
    }
}
</script>

<style scoped></style>
