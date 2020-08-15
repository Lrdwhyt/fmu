<template>
    <div>
        <button v-on:click="toggleGameActive">{{ toggleGameMessage }}</button>
        <button v-on:click="toggleSettingsPanel">Settings</button>
        <button>Help</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    name: "menu-bar",
})
export default class MenuBar extends Vue {
    get isGameActive(): boolean {
        return this.$store.getters.isGameActive;
    }

    get toggleGameMessage(): string {
        return this.isGameActive ? "Stop game" : "Start game";
    }

    toggleGameActive() {
        if (this.isGameActive) {
            this.$store.dispatch("stopGame");
        } else {
            this.$store.dispatch("startGame");
        }
    }

    toggleSettingsPanel() {
        this.$store.commit("toggleSettingsPanel");
    }
}
</script>

<style scoped></style>
