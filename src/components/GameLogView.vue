<template>
    <table>
        <tr v-for="vote in votes" v-bind:key="vote.location">
            <td>{{ vote.location }}</td>
            <td>
                <span>{{ vote.user }} </span>
                <span>{{ voteString(vote.type) }}</span>
                <span>{{ typeof vote.target === "number" ? " " : vote.target }}</span>
                <span></span>
            </td>
        </tr>
    </table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Vote, VoteType } from "@/Vote";
import { Day } from "@/Day";
import { filterByDay } from "@/VoteFilter";

@Component({
    name: "game-log-view",
    components: {},
})
export default class GameLogView extends Vue {
    get selectedDay(): number {
        return this.$store.getters.selectedDay;
    }

    get day(): Day {
        return this.$store.getters.days[this.selectedDay];
    }

    get votes(): Vote[] {
        if (this.selectedDay in this.$store.getters.days) {
            return this.$store.getters.voteLog.filter(filterByDay(this.day));
        } else {
            return this.$store.getters.voteLog;
        }
    }

    voteString(type: VoteType): string {
        if (type === VoteType.VOTE) {
            return "voted";
        } else {
            return "unvoted";
        }
    }
}
</script>

<style scoped></style>
