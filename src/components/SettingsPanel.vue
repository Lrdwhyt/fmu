<template>
    <div class="settings-panel" v-if="this.isOpen">
        <div class="settings-menu">
            <button
                @click="showGeneral"
                :class="{ 'active-tab': activePanel === 'GeneralSettingsPanel' }"
                >General</button
            ><button
                @click="showPlatform"
                :class="{ 'active-tab': activePanel === 'PlatformSettings' }"
                >Platform</button
            ><button
                @click="showNicknames"
                :class="{ 'active-tab': activePanel === 'NicknameManagerPanel' }"
                >Nicknames</button
            ><button
                @click="showColours"
                :class="{ 'active-tab': activePanel === 'ColourManagementPanel' }"
                >Colours</button
            ><button @click="showMemory" :class="{ 'active-tab': activePanel === 'MemoryPanel' }"
                >Memory</button
            >
        </div>
        <div class="active-settings-panel">
            <component v-bind:is="activePanel" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import NicknameManagerPanel from "./NicknameManagerPanel.vue";
import PlatformSettings from "./ForumsOfLoathingSettings.vue";
import GeneralSettingsPanel from "./GeneralSettingsPanel.vue";
import ColourManagementPanel from "./ColourManagementPanel.vue";
import MemoryPanel from "./MemoryPanel.vue";

@Component({
    name: "SettingsPanel",
    components: {
        NicknameManagerPanel,
        PlatformSettings,
        MemoryPanel,
        GeneralSettingsPanel,
        ColourManagementPanel,
    },
})
export default class SettingsPanel extends Vue {
    comp: string = "GeneralSettingsPanel";

    get isOpen(): boolean {
        return this.$store.getters.isSettingsPanelOpen;
    }

    showGeneral() {
        this.$store.commit("setSettingsPanel", "GeneralSettingsPanel");
        this.comp = "GeneralSettingsPanel";
    }

    showColours() {
        this.$store.commit("setSettingsPanel", "ColourManagementPanel");
    }

    showNicknames() {
        this.$store.commit("setSettingsPanel", "NicknameManagerPanel");
    }

    showMemory() {
        this.$store.commit("setSettingsPanel", "MemoryPanel");
    }

    showPlatform() {
        this.$store.commit("setSettingsPanel", "PlatformSettings");
    }

    get activePanel() {
        return this.$store.getters.settingsPanel;
    }
}
</script>

<style scoped>
.active-settings-panel {
    background-color: var(--fmu-background);
    padding: 8px;
}

button {
    background-color: var(--fmu-background);
    border: none;
    font: inherit;
    padding: 5px 10px;
}

button:hover {
    background-color: var(--fmu-background-darker);
}

button.active-tab {
    border-bottom: 3px solid rgb(233, 30, 99);
    padding: 5px 10px 2px;
}
</style>
