<template>
    <div class="general-settings-wrapper fmu-panel">
        <div>
            <input type="checkbox" id="includeUnvotes" :checked="includeUnvotes" @input="updateIncludeUnvotes" />
            <label for="includeUnvotes">Include unvotes in tally</label>
        </div>
        <div>
            <input type="checkbox" id="showPostNumbers" :checked="showPostNumbers" @input="updateShowPostNumbers" />
            <label for="showPostNumbers">Show post numbers in BBCode tally</label>
        </div>
        <div>
            <input type="checkbox" id="useColours" :checked="useColours" @input="updateUseColours" />
            <label for="useColours">Use colours in tally</label>
        </div>
        <div>
            <label for="minConfidence">Minimum percentage score to match names (100 to require exact match)</label>
            <input type="number" id="minConfidence" min="0" max="100" size="4" :value="minConfidence" @change="setMinConfidence" />
        </div>
        <div>
            <label for="nightLength">Night length</label>
            <input type="number" id="nightLength" min="0" size="4" :value="nightLength" @change="setNightLength" />
            <label>minutes</label>
        </div>
        <no-elimination-keyword-list />
        <no-vote-keyword-list />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import NoEliminationKeywordList from "./NoEliminationKeywords/NoEliminationKeywordList.vue";
import NoVoteKeywordList from "./NoVoteKeywords/NoVoteKeywordList.vue";

@Component({
    name: "general-settings-panel",
    components: {
        NoEliminationKeywordList,
        NoVoteKeywordList,
    },
})
export default class GeneralSettingsPanel extends Vue {
    get includeUnvotes(): boolean {
        return this.$store.getters.includeUnvotes;
    }

    get useColours(): boolean {
        return this.$store.getters.useColours;
    }

    get showPostNumbers(): boolean {
        return this.$store.getters.showPostNumbers;
    }

    get minConfidence(): number {
        return this.$store.getters.minConfidence;
    }

    get nightLength(): number {
        return this.$store.getters.nightLength;
    }

    updateIncludeUnvotes(e: Event) {
        this.$store.commit("setIncludeUnvotes", (e.target as HTMLInputElement).checked);
    }

    updateUseColours(e: Event) {
        this.$store.commit("updateUseColours", (e.target as HTMLInputElement).checked);
    }

    updateShowPostNumbers(e: Event) {
        this.$store.commit("updateShowPostNumbers", (e.target as HTMLInputElement).checked);
    }

    setMinConfidence(e: Event): void {
        this.$store.commit("setMinConfidence", (e.target as HTMLInputElement).value);
    }

    setNightLength(e: Event): void {
        this.$store.commit("setNightLength", (e.target as HTMLInputElement).value);
    }
}
</script>

<style scoped>
.general-settings-wrapper > div {
    min-height: 25px;
}

input {
    padding: 3px;
}
</style>
