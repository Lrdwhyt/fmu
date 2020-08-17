<template>
    <div id="fmu">
        <game-panel />
        <menu-bar />
        <settings-panel />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import GamePanel from "./GamePanel.vue";
import MenuBar from "./MenuBar.vue";
import SettingsPanel from "./SettingsPanel.vue";
import "@/assets/global.css";

@Component({
    components: {
        GamePanel,
        MenuBar,
        SettingsPanel,
    },
})
export default class App extends Vue {}
</script>

<style scoped></style>
