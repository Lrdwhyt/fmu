<template>
    <div class="fmu-panel">
        <GameLogView />
        <!--
        <div class="day-management">
            <DayManagementPanel />
        </div>
        -->
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
    name: "GameLogPanel",
    components: {
        GameLogView,
        DayManagementPanel,
    },
})
export default class GameLogPanel extends Vue {}
</script>

<style scoped>
.day-management {
    margin-top: 8px;
}
</style>
