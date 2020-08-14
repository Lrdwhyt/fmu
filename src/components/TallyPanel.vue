<template>
    <div>
        <!--<template v-for="(item, target) in tally.tally">
            <div v-bind:key="target">
                <strong>{{ target }}</strong>
                <span v-for="vote in item" :key="vote.vote.location" :class="{ unvote: 'unvote' in vote }">
                    {{ vote.vote.user }} ({{ vote.vote.location }}) {{ vote.unvote ? vote.unvote.location : " " }}
                </span>
            </div>
        </template>-->
        <tally-view :tally="tally" />
        <div>
            <button>Update</button>
            <button @click="copyBbcode">Copy as BBcode</button>
        </div>
        <textarea ref="copyContainer" />
        <day-management-panel />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Vote, VoteType } from "@/Vote";
import TallyView from "./Tally/TallyView.vue";
import DayManagementPanel from "./DayManagementPanel.vue";
import { Day } from "@/Day";
import { filterByDay } from "@/VoteFilter";
import { createFromLog, Tally, TallyWrapper, numberVotes } from "@/Tally";
import { writeBbcode, header } from "@/BbcodeWriter";

@Component({
    name: "tally-panel",
    components: {
        TallyView,
        DayManagementPanel,
    },
})
export default class TallyPanel extends Vue {
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

    get tally(): TallyWrapper {
        return createFromLog(this.votes, this.$store.getters.playerList);
    }

    copyBbcode(): void {
        const tallyHeader = header(this.selectedDay + 1, this.day);
        const tally = writeBbcode(this.tally);
        const bbCode = tallyHeader + tally;

        (this.$refs.copyContainer as HTMLTextAreaElement).value = bbCode;
        (this.$refs.copyContainer as HTMLTextAreaElement).select();
        document.execCommand("copy");
    }
}
</script>

<style scoped>
.unvote {
    text-decoration: line-through;
}

textarea {
    height: 0;
    opacity: 0;
}
</style>
