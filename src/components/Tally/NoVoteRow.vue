<template>
    <div>
        <div class="target">
            <div class="number-votes">
                {{ number }}
            </div><div class="target-name">Has not voted</div>
        </div>
        <div class="voters">
            <non-voter v-for="(player, index) in players" :key="index" :player="player" />
        </div>
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
    background-color: rgb(31, 31, 31);
    color: #fff;
    display: inline-block;
    font-weight: bold;
    padding: 5px;
}

.target-name {
    background-color: rgb(231, 35, 198);
    color: #fff;
    display: inline-block;
    font-weight: bold;
    padding: 5px;
}
</style>
