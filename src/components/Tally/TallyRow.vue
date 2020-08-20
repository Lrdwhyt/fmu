<template>
    <div v-if="visible">
        <div class="target">
            <div class="number-votes"> {{ number }} </div
            ><div class="target-name">
                {{ target }}
            </div>
        </div>
        <tally-voter v-for="(pair, index) in item" :key="index" :pair="pair" />
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
    background-color: #8c92b5;
    color: #fff;
    display: inline-block;
    font-weight: bold;
    padding: 5px;
}
</style>
