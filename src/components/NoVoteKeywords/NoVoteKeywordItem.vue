<template>
    <div class="word-view">
        <label>{{ this.$props.keyword }}</label
        ><button class="remove-button" @click="removeItem">🗙</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
    name: "no-vote-keyword-item",
})
export default class NoVoteKeywordItem extends Vue {
    @Prop() private keyword!: string;

    removeItem(e: Event): void {
        this.$store.commit("removeNoVoteKeyword", this.$props.keyword);
    }
}
</script>

<style scoped></style>
