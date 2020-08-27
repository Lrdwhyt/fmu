<template>
    <div>
        <div>
            <DayList :activeDay="activeDay" />
            <button class="fmu-button" @click="addDay">+</button>
        </div>
        <div class="day-view">
            <DayView :day="activeDay" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import DayList from "./Days/DayList.vue";
import DayView from "./Days/DayView.vue";
import { Day, DayBoundaryType, generateNext } from "@/Day";
import { getTotalPages } from "@/forums-of-loathing/Parser";

@Component({
    name: "DayManagementPanel",
    components: {
        DayList,
        DayView,
    },
})
export default class DayManagementPanel extends Vue {
    @Prop() private activeDay!: number;

    addDay(): void {
        let lastKnownPost: number = 1;
        const totalPages = getTotalPages();
        const data = this.$store.getters.rawGameData;
        if (totalPages in data) {
            lastKnownPost = data[totalPages].last;
        } else {
            lastKnownPost = (totalPages - 1) * this.$store.getters.postsPerPage + 1;
        }
        const day: Day = generateNext(
            this.$store.getters.days,
            this.$store.getters.nightTime,
            this.$store.getters.dayLength,
            this.$store.getters.nightLength,
            lastKnownPost
        );
        this.$store.commit("addDay", day);
    }
}
</script>

<style scoped>
.day-view {
    margin-top: 8px;
}
</style>
