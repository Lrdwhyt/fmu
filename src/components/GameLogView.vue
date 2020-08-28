<template>
    <table>
        <GameLogItem v-for="(vote, index) in votes" :key="index" :index="index" :event="vote" />
    </table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import GameLogItem from "./GameLogItem.vue";
import { Vote, VoteType } from "@/Vote";
import { Day } from "@/Day";
import { filterGameLogByDay } from "@/GameDataFilter";

@Component({
    name: "GameLogView",
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

    get rawGameData() {
        return this.$store.getters.rawGameData;
    }

    get votes() {
        if (!(this.selectedDay in this.$store.getters.days)) {
            return Object.values(this.rawGameData).reduce((result, current) =>
                Object.assign(result, current)
            );
        }

        return filterGameLogByDay(this.rawGameData, this.day);
    }
}
</script>

<style scoped>
table {
    border-collapse: collapse;
}
</style>
