<template>
    <div class="no-vote-keyword-list">
        <label>No vote keywords</label>
        <template v-for="keyword in keywords">
            <NoVoteKeywordItem v-bind:key="keyword" :keyword="keyword" />
        </template>
        <AddNoVoteKeywordItem v-if="isAddKeyword" @register="hideInput" />
        <button class="fmu-button" @click="addKeyword">+</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import NoVoteKeywordItem from "./NoVoteKeywordItem.vue";
import AddNoVoteKeywordItem from "./AddNoVoteKeywordItem.vue";

@Component({
    name: "NoVoteKeywordList",
    components: {
        NoVoteKeywordItem,
        AddNoVoteKeywordItem,
    },
})
export default class NoVoteKeywordList extends Vue {
    private isAddKeyword: boolean = false;

    get keywords() {
        return this.$store.getters.noVoteKeywords;
    }

    addKeyword() {
        this.isAddKeyword = !this.isAddKeyword;
    }

    hideInput() {
        this.isAddKeyword = false;
    }
}
</script>

<style scoped>
.no-vote-keyword-list > div {
    margin: 4px;
}
</style>
