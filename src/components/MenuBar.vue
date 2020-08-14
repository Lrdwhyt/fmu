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

    mounted() {}

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

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
