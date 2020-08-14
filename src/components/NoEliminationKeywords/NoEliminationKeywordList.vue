<template>
    <div class="no-elimination-keyword-list">
        <label>No elimination keywords</label>
        <template v-for="keyword in keywords">
            <no-elimination-keyword-item v-bind:key="keyword" :keyword="keyword" />
        </template>
        <add-no-elimination-keyword-item v-if="isAddKeyword" @register="hideInput" />
        <button @click="addKeyword">+</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import NoEliminationKeywordItem from "./NoEliminationKeywordItem.vue";
import AddNoEliminationKeywordItem from "./AddNoEliminationKeywordItem.vue";

@Component({
    name: "no-elimination-keyword-list",
    components: {
        NoEliminationKeywordItem,
        AddNoEliminationKeywordItem,
    },
})
export default class NoEliminationKeywordList extends Vue {
    private isAddKeyword: boolean = false;

    get keywords() {
        return this.$store.getters.noEliminationKeywords;
    }

    addKeyword() {
        this.isAddKeyword = true;
    }

    hideInput() {
        this.isAddKeyword = false;
    }
}
</script>

<style scoped>
.no-elimination-keyword-list > div {
    margin: 4px;
}
</style>
