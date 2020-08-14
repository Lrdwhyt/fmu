<template>
    <div class="player-item">
        <div class="player-name word-edit" v-if="isEditName">
            <input type="text" ref="edit" :value="this.$props.name" @blur="stopEdit" @keyup="handleKeyup" />
        </div>
        <div class="player-name word-view" v-else>
            <label @click="edit">{{ this.$props.name }}</label
            ><button class="remove-button" @click="remove">🗙</button>
        </div>
        <button class="status-indicator">alive</button>
        <div class="death-selection" v-if="false">
            <button>night</button>
            <button>1</button>
        </div>
        <div class="aliases">
            <input type="text" ref="aliasInput" v-if="isAddAlias" @blur="addAlias" @keyup="handleKeyupAlias" />
            <button @click="showAliasInput">+</button>
        </div>
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
    private isEditName: boolean = false;
    private isAddAlias: boolean = false;

    edit(): void {
        this.isEditName = true;
        Vue.nextTick(() => {
            (this.$refs.edit as HTMLInputElement).focus();
        });
    }

    handleKeyupAlias(e: KeyboardEvent): void {
        if (e.keyCode === 13) {
            this.addAlias(e);
        }
    }

    addAlias(e: Event): void {
        const alias = (e.target as HTMLInputElement).value;
        if (alias.length) {
            this.isAddAlias = false;
            this.$store.commit("addAlias", {
                player: this.name,
                alias: alias,
            });
        }
    }

    showAliasInput(): void {
        this.isAddAlias = !this.isAddAlias;
        Vue.nextTick(() => {
            (this.$refs.aliasInput as HTMLInputElement).focus();
        });
    }

    handleKeyup(e: KeyboardEvent) {
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
            this.isEditName = false;
        }
    }

    remove(): void {
        this.$store.commit("removePlayer", this.$props.name);
    }
}
</script>

<style scoped>
.player-item {
    display: inline-block;
}

label {
    cursor: text;
}

.death-selection {
    display: inline-block;
}

.aliases {
    display: inline-block;
}
</style>
