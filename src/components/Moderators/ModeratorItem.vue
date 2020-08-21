<template>
    <div class="word-view">
        <label>{{ this.$props.moderator }}</label
        ><button class="remove-button" @click="removeModerator">🗙</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
    name: "ModeratorItem",
})
export default class ModeratorItem extends Vue {
    @Prop() private moderator!: string;

    removeModerator(e: Event): void {
        this.$store.commit("removeModerator", this.$props.moderator);
    }
}
</script>

<style scoped></style>
