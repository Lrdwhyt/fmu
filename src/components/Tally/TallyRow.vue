<template>
    <div>
        <div class="target">
            <div class="number-votes">
                {{ number }}
            </div><div class="target-name">
                {{ target }}
            </div>
        </div>
        <div class="voters">
            <tally-voter v-for="(pair, index) in item" :key="index" :pair="pair" />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import TallyVoter from "./TallyVoter.vue";
import { numberVotes, TallyItem } from "@/Tally";

@Component({
    name: "tally-row",
    components: {
        TallyVoter,
    },
})
export default class TallyRow extends Vue {
    @Prop() private item!: TallyItem;
    @Prop() private target!: string;

    get number(): number {
        return numberVotes(this.item);
    }
}
</script>

<style scoped>
.target,
.voters {
    display: inline-block;
}

.number-votes {
    background-color: #666;
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
