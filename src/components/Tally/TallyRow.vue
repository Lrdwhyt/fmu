<template>
    <div v-if="visible">
        <div class="target">
            <div class="number-votes"> {{ number }} </div
            ><div class="target-name">
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

    get visible(): boolean {
        return this.includeUnvotes || this.number > 0;
    }

    get includeUnvotes(): boolean {
        return this.$store.getters.includeUnvotes;
    }
}
</script>

<style scoped>
.target,
.voters {
    display: inline-block;
}

.number-votes {
    background-color: #1a002f;
    color: #fff;
    display: inline-block;
    font-weight: bold;
    padding: 5px;
}

.target-name {
    background-color: #4f3d8a;
    color: #fff;
    display: inline-block;
    font-weight: bold;
    padding: 5px;
}
</style>
