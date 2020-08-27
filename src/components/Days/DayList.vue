<template>
    <div class="day-nav">
        <div class="days-label"> <label>Days</label> </div
        ><div class="day-tabs">
            <DayItem :index="-1" /><DayItem
                v-for="(day, index) in days"
                :key="index"
                :index="index"
                :active="index === activeDay"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import DayItem from "./DayItem.vue";
import { Day } from "@/Day";

@Component({
    name: "DayList",
    components: {
        DayItem,
    },
})
export default class DayList extends Vue {
    @Prop() private activeDay!: number;

    get days(): Day[] {
        return this.$store.getters.days;
    }
}
</script>

<style scoped>
.day-nav {
    box-shadow: 0 1px 2px rgb(80, 80, 80, 0.8);
    display: inline-block;
}

.days-label {
    background-color: #e91e63;
    color: #fff;
    display: inline-block;
    padding: 4px 10px;
}

.day-tabs {
    background-color: #fff;
    display: inline-block;
}
</style>
