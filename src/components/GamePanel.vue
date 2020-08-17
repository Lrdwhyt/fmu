<template>
    <div class="game-panel" v-if="isActive">
        <page-list />
        <div>
            <button @click="showVoteTally" :class="{ 'active-tab': activePanel === 'TallyPanel' }">Tally</button
            ><button @click="showGameConfig" :class="{ 'active-tab': activePanel === 'GameConfigPanel' }">Game Configuration</button
            ><button @click="showPlayerManagement" :class="{ 'active-tab': activePanel === 'PlayerManagementPanel' }">Players</button
            ><button @click="showGameLog" :class="{ 'active-tab': activePanel === 'GameLogPanel' }">Game Log</button>
        </div>
        <div class="active-game-panel">
            <component :is="activePanel" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import TallyPanel from "./TallyPanel.vue";
import GameConfigPanel from "./GameConfigPanel.vue";
import PlayerManagementPanel from "./PlayerManagementPanel.vue";
import GameLogPanel from "./GameLogPanel.vue";
import PageList from "./PageList.vue";

@Component({
    name: "game-panel",
    components: {
        PageList,
        TallyPanel,
        GameConfigPanel,
        PlayerManagementPanel,
        GameLogPanel,
    },
})
export default class GamePanel extends Vue {
    private comp: string = "GameConfigPanel";

    get isActive(): boolean {
        return this.$store.getters.isGameActive;
    }

    get activePanel(): string {
        return this.$store.getters.gamePanel;
    }

    showVoteTally(): void {
        this.$store.commit("setGamePanel", "TallyPanel");
    }

    showGameLog(): void {
        this.$store.commit("setGamePanel", "GameLogPanel");
    }

    showGameConfig(): void {
        this.$store.commit("setGamePanel", "GameConfigPanel");
    }

    showPlayerManagement(): void {
        this.$store.commit("setGamePanel", "PlayerManagementPanel");
    }
}
</script>

<style scoped>
.active-game-panel {
    background-color: var(--fmu-background);
    padding: 8px;
}

button {
    background-color: var(--fmu-background);
    border: none;
    font-family: inherit;
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
