<template>
    <div>
        <tally-row v-for="(item, target) in votes" :item="item" :key="target" :target="target" />
        <no-vote-row :players="nonVoters" v-if="nonVoters.length" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import TallyRow from "./TallyRow.vue";
import NoVoteRow from "./NoVoteRow.vue";
import { Vote, VoteType } from "@/Vote";
import { Tally, FullTally } from "@/Tally";

@Component({
    name: "tally-view",
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
.unvote {
    text-decoration: line-through;
}

textarea {
    height: 0;
    opacity: 0;
}
</style>
