<template>
    <div
        class="day-tab"
        @click="selectDay"
        :class="{ selected: isSelected, 'last-day': isRemovable }"
    >
        <label>{{ text }}</label
        ><button v-if="isRemovable" class="remove-button" @click.stop="remove">🗙</button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Day } from "@/Day";

@Component({
    name: "DayItem",
})
export default class DayItem extends Vue {
    @Prop() private index!: number;

    get days(): Day[] {
        return this.$store.getters.days;
    }

    get selectedDay(): number {
        return this.$store.getters.selectedDay;
    }

    get isSelected(): boolean {
        return this.selectedDay === this.index;
    }

    get isRemovable(): boolean {
        return this.index >= 0 && this.index === this.days.length - 1;
    }

    get text(): string {
        if (this.index === -1) {
            return "All";
        }

        return String(this.index + 1);
    }

    selectDay(): void {
        this.$store.commit("selectDay", this.index);
    }

    remove(e: Event): void {
        this.$store.commit("removeLastDay");
    }
}
</script>

<style scoped>
.day-tab {
    background-color: #fff;
    display: inline-block;
    font: inherit;
}

.day-tab > label {
    display: inline-block;
    padding: 4px 12px;
}

.day-tab:hover {
    background-color: #eee;
}

.day-tab.selected {
    border-bottom: 3px solid rgb(233, 0, 140);
}

.day-tab.selected > label {
    padding: 4px 12px 1px;
}

.remove-button {
    padding: 3px 4px 3px 0;
}

.day-tab.selected > .remove-button {
    padding: 3px 4px 1px 0;
}

.day-tab.last-day > label {
    padding-right: 6px;
}
</style>
