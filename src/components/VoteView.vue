<template>
    <div>
        <template v-for="(item, target) in tally">
            <div v-bind:key="target">
                <strong>{{ target }}</strong>
                <span v-for="vote in item.votes" :key="vote.vote.location" :class="{ unvote: 'unvote' in vote }">
                    {{ vote.vote.user }} ({{ vote.vote.location }}) {{ if (vote.unvote) { vote.unvote.location } }}
                </span>
            </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Vote, VoteType } from "@/Vote";
import DayManagementPanel from "./DayManagementPanel.vue";
import { Day } from "@/Day";
import { filterByDay } from "@/VoteFilter";
import { RawTally, createFromLog, Tally } from "@/Tally";

@Component({
    name: "tally-item-view",
    components: {
        DayManagementPanel,
    },
})
export default class TallyItemView extends Vue {


    get selectedDay(): number {
        return this.$store.getters.selectedDay;
    }

    get day(): Day {
        return this.$store.getters.days[this.selectedDay];
    }

    get tally(): Tally {
        return createFromLog(this.votes, this.$store.getters.playerList);
    }
}
</script>

<style scoped>
.unvote {
    text-decoration: line-through;
}
</style>
