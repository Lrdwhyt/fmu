<template>
    <div class="fmu-panel">
        <game-log-view />
        <day-management-panel />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import GameLogView from "./GameLogView.vue";
import DayManagementPanel from "./DayManagementPanel.vue";
import { Vote } from "@/Vote";
import { Day } from "@/Day";
import { filterByDay } from "@/VoteFilter";

@Component({
    name: "game-log-panel",
    components: {
        GameLogView,
        DayManagementPanel,
    },
})
export default class GameLogPanel extends Vue {
    get selectedDay(): number {
        return this.$store.getters.selectedDay;
    }

    get day(): Day {
        return this.$store.getters.days[this.selectedDay];
    }

    get votes(): Vote[] {
        if (this.selectedDay in this.$store.getters.days) {
            return this.$store.getters.voteLog.filter(filterByDay(this.day));
        } else {
            return this.$store.getters.voteLog;
        }
    }
}
</script>

<style scoped></style>
