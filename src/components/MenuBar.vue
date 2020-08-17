<template>
    <div class="fmu-menu-bar">
        <div class="fmu-title" title="Forum Mafia Utilities">
            FMU
        </div>
        <div class="fmu-menu-controls">
            <button class="fmu-button" @click="toggleGameActive">{{ toggleGameMessage }}</button>
            <button class="fmu-button" @click="toggleSettingsPanel">Settings</button>
            <button class="fmu-button" @click="openHelp">Help</button>
        </div>
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

    openHelp(): void {
        window.open("https://github.com/Lrdwhyt/fmu/wiki", "_blank");
    }
}
</script>

<style scoped>
.fmu-menu-bar {
    background-color: var(--fmu-background);
    display: inline-block;
    margin: 6px 0;
}

.fmu-title {
    background-color: #e91e63;
    color: #fff;
    display: inline-block;
    padding: 12px 8px;
}

.fmu-menu-controls {
    display: inline-block;
    padding: 0 8px;
}
</style>
