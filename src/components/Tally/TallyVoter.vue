<template>
    <div class="voter" :class="{ unvote: hasUnvote }" v-if="visible">
        <label :style="{ color: colour }">{{ user }}</label
        ><a :href="linkPost(pair.vote)" :title="pair.vote.source">{{ pair.vote.location }}</a
        ><a v-if="isFullPair" :href="linkPost(pair.unvote)" :title="pair.unvote.source">{{ unvoteLocation }}</a>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Vote, VoteType } from "@/Vote";
import { VoteUnvotePair } from "@/Tally";

@Component({
    name: "TallyVoter",
    components: {},
})
export default class TallyVoter extends Vue {
    @Prop() private pair!: VoteUnvotePair;

    get visible(): boolean {
        return this.includeUnvotes || !this.hasUnvote;
    }

    get includeUnvotes(): boolean {
        return this.$store.getters.includeUnvotes;
    }

    get hasUnvote(): boolean {
        return this.pair.vote.type === VoteType.UNVOTE || "unvote" in this.pair;
    }

    get isFullPair(): boolean {
        return this.pair.unvote !== undefined;
    }

    get colour(): string {
        if (!this.useColours) {
            return "";
        }

        const group = this.$store.getters.player(this.pair.vote.user).group || "none";
        const groupColour = this.$store.getters.color(group) || "#000";

        return groupColour;
    }

    get useColours(): boolean {
        return this.$store.getters.useColours;
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

    linkPost(vote: Vote): string {
        return `http://forums.kingdomofloathing.com/vb/showthread.php?p=${vote.link}`;
    }
}
</script>

<style scoped>
div {
    display: inline-block;
}

.unvote {
    opacity: 0.3;
    text-decoration: line-through;
}

.unvote label,
.unvote a {
    text-decoration: line-through;
}

.unvote:hover {
    opacity: 0.7;
}

a,
label {
    display: inline-block;
    padding: 4px;
}

label {
    padding: 4px 6px;
}

a {
    background-color: #575668;
}

a,
a:hover {
    color: #fff;
    text-decoration: none;
}

a:hover {
    background-color: #383742;
}

.voter {
    background-color: #fff;
    box-shadow: var(--card-shadow);
    margin: 4px;
}
</style>
