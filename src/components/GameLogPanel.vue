<template>
    <div class="fmu-panel">
        <div class="day-management">
            <DayManagementPanel :activeDay="selectedDay" />
        </div>
        <GameLogView />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import GameLogView from "./GameLogView.vue";
import DayManagementPanel from "./DayManagementPanel.vue";
import { Vote } from "@/Vote";
import { Day } from "@/Day";

@Component({
    name: "GameLogPanel",
    components: {
        GameLogView,
        DayManagementPanel,
    },
})
export default class GameLogPanel extends Vue {
    get selectedDay(): number {
        return this.$store.getters.selectedDay;
    }
}
</script>

<style scoped>
.day-management {
    margin-top: 8px;
}
</style>
