<template>
    <div class="fmu-panel">
        <div class="player-list">
            <PlayerList />
        </div>
        <div class="manage-players">
            <div>
                <input ref="newPlayer" type="text" placeholder="Player" @keyup="handleKeyup" />
                <button class="fmu-button" @click="addPlayer">Add</button>
                <button class="fmu-button" @click="setPasteActive">Add from list</button>
            </div>
            <div>
                <div v-if="isPasteActive">
                    <div><textarea ref="pasteArea"/></div>
                    <div><button class="fmu-button" @click="addMultiple">Add all</button></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import PlayerList from "./PlayerList.vue";
import { Player } from "@/Player";
import { trimChars } from "@/StringUtils";

@Component({
    name: "PlayerManagementPanel",
    components: {
        PlayerList,
    },
})
export default class PlayerManagementPanel extends Vue {
    private isPasteActive: boolean = false;

    setPasteActive() {
        this.isPasteActive = !this.isPasteActive;
        if (this.isPasteActive) {
            Vue.nextTick(() => {
                (this.$refs.pasteArea as HTMLTextAreaElement).focus();
            });
        }
    }

    addMultiple(): void {
        const contents: string = (this.$refs.pasteArea as HTMLTextAreaElement).value;
        if (!contents.length) {
            return;
        }

        const list: string[] = contents.split("\n");
        for (const player of list) {
            this.addPlayerFromPaste(player);
        }
        this.isPasteActive = false;
    }

    handleKeyup(e: KeyboardEvent): void {
        if (e.keyCode === 13) {
            this.addPlayer();
        }
    }

    addPlayer(): void {
        const playerName: string = (this.$refs.newPlayer as HTMLInputElement).value;
        if (playerName.length) {
            this.commitAddPlayer(playerName);
            (this.$refs.newPlayer as HTMLInputElement).value = "";
            (this.$refs.newPlayer as HTMLInputElement).focus();
        }
    }

    commitAddPlayer(name: string): void {
        const player: Player = {
            name: name,
            isAlive: true,
        };
        this.$store.commit("addPlayer", player);
    }

    addPlayerFromPaste(name: string): void {
        if (name.includes(")")) {
            name = name.split(")")[1];
        }
        if (name.includes(".")) {
            name = name.split(".")[1];
        }
        name = trimChars(name, "). ");

        if (name.length === 0) {
            return;
        }

        this.commitAddPlayer(name);
    }
}
</script>

<style scoped>
.manage-players {
    margin-top: 8px;
}

input {
    font-family: inherit;
    padding: 4px;
}

button {
    margin: 0 4px;
}
</style>
