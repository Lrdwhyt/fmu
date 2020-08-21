<template>
    <table v-if="visible">
        <tr>
            <td class="boundary-label">
                <label>Start</label>
            </td>
            <td>
                <PostSelection type="start" />
            </td>
            <td>
                <DateSelection type="start" />
            </td>
        </tr>
        <tr>
            <td class="boundary-label">
                <label>End</label>
            </td>
            <td>
                <PostSelection type="end" />
            </td>
            <td>
                <DateSelection type="end" />
            </td>
        </tr>
    </table>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import DateSelection from "./DateSelection.vue";
import PostSelection from "./PostSelection.vue";
import { Day, DayBoundaryType } from "@/Day";

@Component({
    name: "DayView",
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
.boundary-label {
    text-align: right;
}
</style>
