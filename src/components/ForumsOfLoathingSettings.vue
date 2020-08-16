<template>
    <div class="fmu-panel">
        <label for="postsPerPage">Number of posts per page:</label>
        <input type="number" id="postsPerPage" size="5" :value="this.postsPerPage" @blur="setPostsPerPage" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    name: "fol-settings",
})
export default class ForumsOfLoathingSettings extends Vue {
    get postsPerPage(): number {
        return this.$store.getters.postsPerPage;
    }

    setPostsPerPage(e: Event): void {
        this.$store.commit("setPostsPerPage", (e.target as HTMLInputElement).value);
    }
}
</script>

<style scoped>
input {
    font: inherit;
    padding: 4px;
}
</style>
