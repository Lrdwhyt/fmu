<template>
    <div>
        <div class="target">
            <div class="number-votes"> {{ number }} </div
            ><div class="target-name">Failed to vote</div>
        </div>
        <NoVoteItem v-for="(player, index) in players" :key="index" :player="player" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import NoVoteItem from "./NoVoteItem.vue";

@Component({
    name: "NoVoteRow",
    components: {
        NoVoteItem,
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

.target {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
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
