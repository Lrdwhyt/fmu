<template>
    <div class="day-boundary-option" :class="{ selected: isSelected }" @click="setActive">
        <input
            type="date"
            ref="date"
            :value="dateString"
            :readonly="!isSelected"
            required="required"
            @blur="setDate"
        /><input
            type="time"
            ref="time"
            :value="time"
            :readonly="!isSelected"
            @blur="setDate"
            required="required"
        />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Day, DayBoundaryType, getTimeStringAsHoursMinutes } from "@/Day";
import { offsetDate } from "@/DateUtils";
import { getTimeZone } from "@/forums-of-loathing/Parser";

@Component({
    name: "DateSelection",
    components: {},
})
export default class DateSelection extends Vue {
    @Prop() private type!: "start" | "end";
    @Prop() private activeDay!: number;

    get isSelected(): boolean {
        return this.day[this.type].type === DayBoundaryType.DATE;
    }

    get day(): Day {
        return this.$store.getters.days[this.activeDay];
    }

    get localDate(): Date {
        return offsetDate(this.day[this.type].date, 0, -new Date().getTimezoneOffset() / 60);
    }

    get dateString(): string {
        return this.localDate.toISOString().substr(0, 10);
    }

    get time(): string {
        return this.localDate.toISOString().substr(11, 5);
    }

    setDate(): void {
        const date = new Date((this.$refs.date as HTMLInputElement).value);
        const hoursMinutes = getTimeStringAsHoursMinutes(
            (this.$refs.time as HTMLInputElement).value
        );
        date.setHours(hoursMinutes.hours);
        date.setMinutes(hoursMinutes.minutes);
        date.setSeconds(59);
        date.setMilliseconds(999);
        this.$store.commit("setDay", {
            day: this.activeDay,
            data: {
                ...this.day,
                [this.type]: {
                    ...this.day[this.type],
                    date: date,
                },
            },
        });
    }

    setActive(e: Event): void {
        if (!this.isSelected) {
            e.preventDefault();
            this.$store.commit("setDay", {
                day: this.activeDay,
                data: {
                    ...this.day,
                    [this.type]: {
                        ...this.day[this.type],
                        type: DayBoundaryType.DATE,
                    },
                },
            });
        }
    }
}
</script>

<style scoped>
input {
    border: none;
    font-family: inherit;
    font-size: 13px;
    padding: 4px;
}

.day-boundary-option {
    box-shadow: var(--card-shadow);
    display: inline-block;
}

.selected {
    border-bottom: 3px solid rgb(66, 148, 255);
}

.selected input {
    padding-bottom: 1px;
}
</style>
