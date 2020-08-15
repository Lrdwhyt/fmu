<template>
    <div class="day-nav">
        <label>Days</label>
        <div class="day-tab word-view" v-for="(day, index) in days" :key="day" @click="selectDay(index)" :class="{ selected: index === selectedDay }">
            <label>{{ index + 1 }}</label
            ><button class="remove-button" @click.stop="remove" v-if="index === days.length - 1">🗙</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Day } from "@/Day";

@Component({
    name: "day-list",
    components: {},
})
export default class DayList extends Vue {
    get days(): Day[] {
        return this.$store.getters.days;
    }

    get selectedDay(): number {
        return this.$store.getters.selectedDay;
    }

    selectDay(index: number): void {
        this.$store.commit("selectDay", index);
    }

    remove(e: Event): void {
        this.$store.commit("removeLastDay");
    }
}
</script>

<style scoped>
.day-nav {
    display: inline-block;
}

.day-tab > label {
    padding: 5px 13px;
}

.day-tab {
    display: inline-block;
}

.day-tab:hover {
    background-color: #eee;
}

.day-tab.selected {
    background-color: rgb(221, 0, 119);
    color: white;
}

.day-tab.selected:hover {
    background-color: rgb(233, 0, 140);
}
</style>
