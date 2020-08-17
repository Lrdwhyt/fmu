<template>
    <div class="fmu-panel">
        <tally-view :tally="tally" />
        <div class="tally-controls">
            <button class="fmu-button">Update</button>
            <button class="fmu-button" @click="copyBbcode">Copy as BBcode</button>
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
import { createFromLog, FullTally } from "@/Tally";
import { writeBbcode, header, TallyOptions } from "@/BbcodeWriter";

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

    get tally(): FullTally {
        return createFromLog(this.votes, this.$store.getters.players, this.selectedDay);
    }

    copyBbcode(): void {
        const tallyOptions: TallyOptions = {
            players: this.$store.getters.players,
            groups: this.$store.getters.groups,
            includeUnvotes: this.$store.getters.includeUnvotes,
            useColours: this.$store.getters.useColours,
            showPostNumbers: this.$store.getters.showPostNumbers,
        };

        const tallyHeader = header(this.selectedDay + 1, this.day);
        const tally = writeBbcode(this.tally, tallyOptions);
        const bbCode = tallyHeader + tally;

        (this.$refs.copyContainer as HTMLTextAreaElement).value = bbCode;
        (this.$refs.copyContainer as HTMLTextAreaElement).select();
        document.execCommand("copy");
    }
}
</script>

<style scoped>
textarea {
    height: 0;
    opacity: 0;
}

.tally-controls {
    margin-top: 8px;
}
</style>
