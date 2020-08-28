<template>
    <div class="fmu-panel">
        <TallyView :tally="tally" />
        <div class="tally-controls">
            <button class="fmu-button" @click="updateTally">Update</button>
            <button class="fmu-button" @click="copyBbcode">Copy as BBcode</button>
            <div class="copy-container" ref="copyContainer">
                <div>Copy the following text:</div>
                <textarea
                    ref="copyArea"
                    class="copy-area"
                    @click="selectCopyArea"
                    @blur="hideCopyContainer"
                />
            </div>
        </div>
        <DayManagementPanel :activeDay="selectedDay" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Vote, VoteType } from "@/Vote";
import TallyView from "./Tally/TallyView.vue";
import DayManagementPanel from "./DayManagementPanel.vue";
import { Day } from "@/Day";
import { filterVotesByDay } from "@/VoteFilter";
import { createTally, FullTally } from "@/Tally";
import { getTallyAsBbcode, getTallyHeader, TallyOptions } from "@/BbcodeWriter";

@Component({
    name: "TallyPanel",
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
            return this.$store.getters.voteLog.filter(filterVotesByDay(this.day));
        } else {
            return this.$store.getters.voteLog;
        }
    }

    get tally(): FullTally {
        return createTally(this.votes, this.$store.getters.players, this.selectedDay);
    }

    get useManualCopy(): boolean {
        return this.$store.getters.useManualCopy;
    }

    updateTally(): void {
        this.$store.dispatch("updateGameData");
        this.$store.dispatch("generateVoteData");
    }

    copyBbcode(): void {
        const tallyOptions: TallyOptions = {
            players: this.$store.getters.players,
            groups: this.$store.getters.groups,
            includeUnvotes: this.$store.getters.includeUnvotes,
            useColours: this.$store.getters.useColours,
            showPostNumbers: this.$store.getters.showPostNumbers,
        };

        const tallyHeader = getTallyHeader(this.selectedDay + 1, this.day);
        const tally = getTallyAsBbcode(this.tally, tallyOptions);
        const bbCode = tallyHeader + tally;

        (this.$refs.copyArea as HTMLTextAreaElement).value = bbCode;
        (this.$refs.copyArea as HTMLTextAreaElement).select();
        try {
            const copySuccess = document.execCommand("copy");
            if (!copySuccess) {
                (this.$refs.copyContainer as HTMLDivElement).classList.add("show-copy-container");
            }
        } catch {
            (this.$refs.copyContainer as HTMLDivElement).classList.add("show-copy-container");
        }
        if (this.useManualCopy) {
            (this.$refs.copyContainer as HTMLDivElement).classList.add("show-copy-container");
        }
    }

    selectCopyArea(): void {
        (this.$refs.copyArea as HTMLTextAreaElement).select();
    }

    hideCopyContainer(): void {
        (this.$refs.copyContainer as HTMLDivElement).classList.remove("show-copy-container");
    }
}
</script>

<style scoped>
.copy-container {
    opacity: 0;
    position: absolute;
    z-index: -999;
}

.copy-container.show-copy-container {
    opacity: inherit;
    position: relative;
    z-index: auto;
}

.copy-area {
    height: 4em;
}

.tally-controls {
    margin: 8px 0;
}
</style>
