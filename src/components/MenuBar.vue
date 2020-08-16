<template>
    <div>
        <button class="fmu-button" @click="toggleGameActive">{{ toggleGameMessage }}</button>
        <button class="fmu-button" @click="toggleSettingsPanel">Settings</button>
        <button class="fmu-button">Help</button>
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
