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
    name: "NoEliminationKeywordItem",
})
export default class NoEliminationKeywordItem extends Vue {
    @Prop() private keyword!: string;

    removeItem(e: Event): void {
        this.$store.commit("removeNoEliminationKeyword", this.$props.keyword);
    }
}
</script>

<style scoped></style>
