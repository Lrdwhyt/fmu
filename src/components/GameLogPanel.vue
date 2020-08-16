<template>
    <div class="fmu-panel">
        <game-log-view />
        <!--
        <div class="day-management">
            <day-management-panel />
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
    name: "game-log-panel",
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
