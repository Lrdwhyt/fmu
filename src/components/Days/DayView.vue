<template>
    <table v-if="visible">
        <tr>
            <td class="boundary-label">
                <label>Start</label>
            </td>
            <td>
                <PostSelection type="start" :activeDay="day" />
            </td>
            <td>
                <DateSelection type="start" :activeDay="day" />
            </td>
        </tr>
        <tr>
            <td class="boundary-label">
                <label>End</label>
            </td>
            <td>
                <PostSelection type="end" :activeDay="day" />
            </td>
            <td>
                <DateSelection type="end" :activeDay="day" />
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
    @Prop() private day!: number;
    private isEditStartPost: boolean = false;
    private isEditEndPost: boolean = false;

    get visible(): boolean {
        return this.day in this.$store.getters.days;
    }
}
</script>

<style scoped>
.boundary-label {
    text-align: right;
}
</style>
