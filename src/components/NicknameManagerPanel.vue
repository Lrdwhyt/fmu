<template>
    <div class="nickname-manager-panel">
        <ul class="player-list">
            <li v-for="(nicks, player) in nicknames" :key="player">
                <nickname-item :name="player" :nicknames="nicks" />
            </li>
            <li>
                <input ref="newPlayer" type="text" @keyup="keyUp" />
                <button @click="addPlayer">Add player</button>
            </li>
        </ul>
        <button>Add from nicknames file</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import NicknameItem from "./NicknameItem.vue";
import { NicknameList } from "@/store/settings";

@Component({
    name: "nickname-manager-panel",
    components: {
        NicknameItem,
    },
})
export default class NicknameManagerPanel extends Vue {
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

    keyUp(e: KeyboardEvent): void {
        if (e.keyCode === 13) {
            this.addPlayer(e);
        }
    }
}
</script>

<style scoped>
ul {
    padding: 0;
}
li {
    list-style-type: none;
    margin: 3px 0;
}
</style>
