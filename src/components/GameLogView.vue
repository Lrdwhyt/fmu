<template>
    <table>
        <GameLogItem
            v-for="(event, index) in events"
            :key="index"
            :index="index"
            :event="event"
            :selected="parseInt(index) === selectedIndex"
            @select="select(parseInt(index))"
        />
    </table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import GameLogItem from "./GameLogItem.vue";
import { Vote, VoteType } from "@/Vote";
import { Day } from "@/Day";
import { filterGameLogByDay } from "@/GameDataFilter";
import { PageData, PostData } from "@/GameData";

@Component({
    name: "GameLogView",
    components: {
        GameLogItem,
    },
})
export default class GameLogView extends Vue {
    private selectedIndex: number = -1;

    get selectedDay(): number {
        return this.$store.getters.selectedDay;
    }

    get day(): Day {
        return this.$store.getters.days[this.selectedDay];
    }

    get rawGameData(): PageData {
        return this.$store.getters.rawGameData;
    }

    get events(): PostData {
        if (!(this.selectedDay in this.$store.getters.days)) {
            return Object.values(this.rawGameData).reduce((result, current) =>
                Object.assign(result, current)
            );
        }

        return filterGameLogByDay(this.rawGameData, this.day);
    }

    select(index: number): void {
        this.selectedIndex = index;
    }
}
</script>

<style scoped>
table {
    border-collapse: collapse;
}
</style>
