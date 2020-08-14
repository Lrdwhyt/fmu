<template>
    <div v-if="visible">
        <div>
            <label>Start</label>
            <post-selection type="start" />
            <date-selection type="start" />
        </div>
        <div>
            <label>End</label>
            <post-selection type="end" />
            <date-selection type="end" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import DateSelection from "./DateSelection.vue";
import PostSelection from "./PostSelection.vue";
import { Day, DayBoundaryType } from "@/Day";

@Component({
    name: "day-view",
    components: {
        DateSelection,
        PostSelection,
    },
})
export default class DayView extends Vue {
    private isEditStartPost: boolean = false;
    private isEditEndPost: boolean = false;

    get selectedDay(): number {
        return this.$store.getters.selectedDay;
    }

    get visible(): boolean {
        return this.selectedDay in this.$store.getters.days;
    }
}
</script>

<style scoped>
.day-boundary-option {
    display: inline-block;
    margin-bottom: 5px;
}
</style>
