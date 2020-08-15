<template>
    <div v-if="isActive">
        <page-list />
        <div>
            <button @click="showVoteTally" :class="{ 'active-tab': activePanel === 'TallyPanel' }">Tally</button
            ><button @click="showGameLog" :class="{ 'active-tab': activePanel === 'GameLogPanel' }">Game log</button
            ><button @click="showGameConfig" :class="{ 'active-tab': activePanel === 'GameConfigPanel' }">Game configuration</button
            ><button @click="showPlayerManagement" :class="{ 'active-tab': activePanel === 'PlayerManagementPanel' }">Players</button>
        </div>
        <component :is="activePanel" />
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
button {
    background-color: #ddd;
    border: none;
    font-family: inherit;
    padding: 5px 10px;
}

button:hover {
    background-color: #eee;
}

button.active-tab {
    border-bottom: 3px solid rgb(233, 30, 99);
    padding: 5px 10px 2px;
}
</style>
