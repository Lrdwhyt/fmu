<template>
    <div class="voter" :class="{ unvote: hasUnvote }" v-if="visible">
        <label>{{ user }}</label>
        <a :title="pair.vote.source">{{ pair.vote.location }}</a>
        <a v-if="isFullPair">{{ unvoteLocation }}</a>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Vote, VoteType } from "@/Vote";
import { VoteUnvotePair } from "@/Tally";

@Component({
    name: "tally-voter",
    components: {},
})
export default class TallyVoter extends Vue {
    @Prop() private pair!: VoteUnvotePair;

    get visible(): boolean {
        return this.showUnvotes || !this.hasUnvote;
    }

    get showUnvotes(): boolean {
        return true;
    }

    get hasUnvote(): boolean {
        return this.pair.vote.type === VoteType.UNVOTE || "unvote" in this.pair;
    }

    get isFullPair(): boolean {
        return this.pair.unvote !== undefined;
    }

    get unvoteLocation(): number {
        if (this.pair.unvote !== undefined) {
            return this.pair.unvote.location;
        }

        return 0;
    }

    get user(): string {
        return this.pair.vote.user;
    }
}
</script>

<style scoped>
div {
    display: inline-block;
}

.unvote {
    opacity: 0.4;
    text-decoration: line-through;
}

.unvote:hover {
    opacity: 0.7;
}

a {
    background-color: #888;
    display: inline-block;
    padding: 3px;
}

label {
    padding: 3px;
}

.voter {
    background-color: rgb(215, 215, 231);
    margin: 4px;
}
</style>
