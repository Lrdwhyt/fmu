<template>
    <div>
        <div class="player-name word-view">
            <label @click="edit">{{ this.$props.name }}</label
            ><button class="remove-button" @click="remove">🗙</button> </div
        ><div class="nicknames-wrapper">
            <div class="nickname word-view" v-for="nickname in nicknames" :key="nickname">
                <label>{{ nickname }}</label
                ><button class="remove-button" @click="removeNickname(nickname)">🗙</button>
            </div>
            <input type="text" ref="newNickname" @blur="addNickname" @keyup="keyUp" />
            <button class="fmu-button" @click="addNickname">Add</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Player } from "@/Player";

@Component({
    name: "nickname-item",
})
export default class NicknameItem extends Vue {
    @Prop() private name!: string;
    @Prop() private nicknames!: string[];

    edit(): void {
        Vue.nextTick(() => {
            (this.$refs.edit as HTMLInputElement).focus();
        });
    }

    remove(): void {
        this.$store.commit("unregisterPlayer", this.$props.name);
    }

    addNickname(e: Event): void {
        const newNickname = (this.$refs.newNickname as HTMLInputElement).value;
        if (newNickname.length) {
            this.$store.commit("addNicknameForPlayer", {
                player: this.$props.name,
                nickname: newNickname,
            });
        }
        (this.$refs.newNickname as HTMLInputElement).value = "";
    }

    removeNickname(nickname: string): void {
        this.$store.commit("removeNickname", {
            player: this.$props.name,
            nickname: nickname,
        });
    }

    keyUp(e: KeyboardEvent): void {
        if (e.keyCode === 13) {
            this.addNickname(e);
        }
    }
}
</script>

<style scoped>
.player-name {
    background-color: #746c8b;
    color: #fff;
    font-weight: bold;
    margin-right: 10px;
}

.nicknames-wrapper {
    display: inline;
}

.nickname {
    margin: 0 3px;
}

input {
    font: inherit;
    padding: 4px;
}
</style>
