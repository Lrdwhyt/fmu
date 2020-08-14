<template>
    <div class="player-name word-edit" v-if="isEditMode">
        <input type="text" ref="edit" :value="this.$props.name" @blur="stopEdit" @keyup="keyUp" />
    </div>
    <div class="player-name word-view" v-else>
        <label @click="edit">{{ this.$props.name }}</label
        ><button class="remove-button" @click="remove">🗙</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Player } from "@/Player";

@Component({
    name: "player-item",
})
export default class PlayerItem extends Vue {
    @Prop() private name!: string;
    private isEditMode: boolean = false;

    edit(): void {
        this.isEditMode = true;
        Vue.nextTick(() => {
            (this.$refs.edit as HTMLInputElement).focus();
        });
    }

    keyUp(e: KeyboardEvent) {
        if (e.keyCode === 13) {
            this.stopEdit(e);
        }
    }

    stopEdit(e: Event): void {
        const newValue = (e.target as HTMLInputElement).value;
        if (newValue.length > 0) {
            this.$store.commit("changePlayerName", {
                oldName: this.$props.name,
                newName: newValue,
            });
            this.isEditMode = false;
        }
    }

    remove(): void {
        this.$store.commit("removePlayer", this.$props.name);
    }
}
</script>

<style scoped>
label {
    cursor: text;
}
</style>
