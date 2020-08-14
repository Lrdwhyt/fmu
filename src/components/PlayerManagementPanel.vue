<template>
    <div>
        <player-list />
        <button @click="setPasteActive">Add from list</button>
        <div v-if="isPasteActive">
            <div><textarea ref="pasteArea" /></div>
            <div><button @click="addMultiple">Add all</button></div>
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
    name: "player-management-panel",
    components: {
        PlayerList,
    },
})
export default class PlayerManagementPanel extends Vue {
    private isMultiPasteActive: boolean = false;

    get isPasteActive(): boolean {
        return this.isMultiPasteActive;
    }

    setPasteActive() {
        this.isMultiPasteActive = !this.isMultiPasteActive;

        if (this.isMultiPasteActive) {
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
            this.addPlayer(player);
        }
        this.isMultiPasteActive = false;
    }

    addPlayer(name: string): void {
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

        const player: Player = {
            name: name,
        };
        this.$store.commit("addPlayer", player);
    }
}
</script>

<style scoped></style>
