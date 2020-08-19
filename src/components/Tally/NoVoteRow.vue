<template>
    <div>
        <div class="target">
            <div class="number-votes"> {{ number }} </div><div class="target-name">Failed to vote</div>
        </div>
        <non-voter v-for="(player, index) in players" :key="index" :player="player" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import NonVoter from "./NoVoterItem.vue";

@Component({
    name: "no-vote-row",
    components: {
        NonVoter,
    },
})
export default class NoVoteRow extends Vue {
    @Prop() private players!: string[];

    get number(): number {
        return this.players.length;
    }
}
</script>

<style scoped>
.target,
.voters {
    display: inline-block;
}

.number-votes {
    background-color: #575668;
    color: #fff;
    display: inline-block;
    font-weight: bold;
    padding: 5px;
}

.target-name {
    background-color: #d1d7e1;
    color: #333;
    display: inline-block;
    font-weight: bold;
    padding: 5px;
}
</style>
