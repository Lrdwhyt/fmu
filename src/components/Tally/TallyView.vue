<template>
    <div class="tally-view">
        <div class="vote-tally">
            <TallyRow v-for="(item, target) in votes" :item="item" :key="target" :target="target" />
        </div>
        <div class="non-voters">
            <NoVoteRow :players="nonVoters" v-if="nonVoters.length" />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import TallyRow from "./TallyRow.vue";
import NoVoteRow from "./NoVoteRow.vue";
import { Vote, VoteType } from "@/Vote";
import { Tally, FullTally } from "@/Tally";

@Component({
    name: "TallyView",
    components: {
        TallyRow,
        NoVoteRow,
    },
})
export default class TallyView extends Vue {
    @Prop() private tally!: FullTally;

    get votes(): Tally {
        return this.tally.tally;
    }

    get nonVoters(): string[] {
        return this.tally.nonvoters;
    }
}
</script>

<style scoped>
.non-voters {
    margin-top: 12px;
}
</style>
