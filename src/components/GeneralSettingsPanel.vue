<template>
    <div class="fmu-panel">
        <div class="general-setting">
            <input
                type="checkbox"
                id="includeUnvotes"
                :checked="includeUnvotes"
                @input="updateIncludeUnvotes"
            />
            <label for="includeUnvotes">Include unvotes in tally</label>
        </div>
        <div class="general-setting">
            <input
                type="checkbox"
                id="showPostNumbers"
                :checked="showPostNumbers"
                @input="updateShowPostNumbers"
            />
            <label for="showPostNumbers">Show post numbers in BBCode tally</label>
        </div>
        <div class="general-setting">
            <input
                type="checkbox"
                id="useColours"
                :checked="useColours"
                @input="updateUseColours"
            />
            <label for="useColours">Use colours in tally</label>
        </div>
        <div class="general-setting">
            <input
                type="checkbox"
                id="useManualCopy"
                :checked="useManualCopy"
                @input="updateUseManualCopy"
            />
            <label for="useManualCopy">Allow manually copying BBCode tallies</label>
        </div>
        <div class="general-setting">
            <label for="minConfidence" title="100 to require exact matches"
                >Minimum percentage score to match names</label
            >
            <input
                type="number"
                id="minConfidence"
                min="0"
                max="100"
                size="4"
                :value="minConfidence"
                @change="setMinConfidence"
            />
        </div>
        <div class="general-setting">
            <label
                for="nightLength"
                title="Time delay used to determine how soon the next day starts after nightfall."
                >Night length</label
            >
            <input
                type="number"
                id="nightLength"
                min="0"
                size="4"
                :value="nightLength"
                @change="setNightLength"
            />
            <label>minutes</label>
        </div>
        <NoEliminationKeywordList />
        <NoVoteKeywordList />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import NoEliminationKeywordList from "./NoEliminationKeywords/NoEliminationKeywordList.vue";
import NoVoteKeywordList from "./NoVoteKeywords/NoVoteKeywordList.vue";

@Component({
    name: "GeneralSettingsPanel",
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

    get useManualCopy(): boolean {
        return this.$store.getters.useManualCopy;
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

    updateUseManualCopy(e: Event) {
        this.$store.commit("setUseManualCopy", (e.target as HTMLInputElement).checked);
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
.general-setting {
    min-height: 25px;
}

input {
    font: inherit;
    padding: 4px;
}
</style>
