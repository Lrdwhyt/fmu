<template>
    <div class="nickname-manager-panel">
        <ul class="player-list">
            <li v-for="(nicks, player) in nicknames" :key="player">
                <NicknameItem :name="player" :nicknames="nicks" />
            </li>
        </ul>
        <div>
            <input ref="newPlayer" type="text" placeholder="Player" @keyup="handleKeyup" />
            <button class="fmu-button" @click="addPlayer">Add</button>
            <button class="fmu-button" @click="togglePasteArea">Import from nicknames file</button>
        </div>
        <div v-if="showPasteArea">
            <div><textarea ref="pasteArea"/></div>
            <button class="fmu-button" @click="importNicknames">Import</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import NicknameItem from "./NicknameItem.vue";
import { NicknameList } from "@/store/settings";
import { parseNicknameFile } from "@/NicknameFileImporter";

@Component({
    name: "NicknameManagerPanel",
    components: {
        NicknameItem,
    },
})
export default class NicknameManagerPanel extends Vue {
    private showPasteArea: boolean = false;

    get nicknames(): NicknameList {
        return this.$store.getters.nicknames;
    }

    addPlayer(e: Event): void {
        const player: string = (this.$refs.newPlayer as HTMLInputElement).value;
        if (player.length) {
            this.$store.commit("registerNewPlayer", player);
        }
        (this.$refs.newPlayer as HTMLInputElement).value = "";
    }

    handleKeyup(e: KeyboardEvent): void {
        if (e.keyCode === 13) {
            this.addPlayer(e);
        }
    }

    togglePasteArea(): void {
        this.showPasteArea = !this.showPasteArea;
        if (this.showPasteArea) {
            Vue.nextTick(() => {
                (this.$refs.pasteArea as HTMLTextAreaElement).focus();
            });
        }
    }

    importNicknames(): void {
        const data = (this.$refs.pasteArea as HTMLTextAreaElement).value;
        const nicknames = parseNicknameFile(data);
        for (const entry of nicknames) {
            this.$store.commit("initialiseNicknames", {
                player: entry.player,
                nicknames: entry.nicknames,
            });
        }
    }
}
</script>

<style scoped>
ul {
    margin: 0;
    padding: 0;
}

li {
    list-style-type: none;
    margin: 3px 0;
}

input {
    font: inherit;
    padding: 4px;
}
</style>
