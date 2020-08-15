<template>
    <div class="player-item" :class="{ 'dead-player': !isAlive }">
        <div class="player-name word-edit" v-if="isEditName">
            <input type="text" ref="edit" :value="this.$props.name" @blur="stopEdit" @keyup="handleKeyup" />
        </div>
        <div class="player-name word-view" v-else>
            <label @click="edit">{{ this.$props.name }}</label
            ><button class="remove-button" @click="remove">🗙</button>
        </div>
        <button class="status-indicator" @click="toggleAlive">{{ lifeString }}</button>
        <div class="death-selection word-view" v-if="!isAlive">
            <button @click="switchDeathPhaseType">{{ deathPhaseType }}</button
            ><input
                type="number"
                ref="editDeathTime"
                v-if="isEditDeathTime"
                :value="dayOfDeath"
                size="3"
                @blur="saveDeathDay"
                @keyup="handleKeyupDeathDay"
            />
            <button @click="editDeathTime" v-else>{{ dayOfDeath }}</button>
        </div>
        <div class="aliases">
            <div class="word-view" v-for="alias in aliases" :key="alias">
                <label>{{ alias }}</label
                ><button class="remove-button" @click="removeAlias(alias)">🗙</button>
            </div>
            <input type="text" ref="aliasInput" v-if="isAddAlias" @blur="addAlias" @keyup="handleKeyupAlias" />
            <button @click="showAliasInput">+</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Player } from "@/Player";
import { PhaseType, Phase } from "@/Phase";

@Component({
    name: "player-item",
})
export default class PlayerItem extends Vue {
    @Prop() private name!: string;
    private isEditName: boolean = false;
    private isAddAlias: boolean = false;
    private isEditDeathTime: boolean = false;

    get player(): Player {
        return this.$store.getters.player(this.name);
    }

    get aliases(): string[] {
        return this.player.aliases || [];
    }

    get lifeString(): string {
        if (this.player.isAlive) {
            return "alive";
        } else {
            return "dead";
        }
    }

    get isAlive(): boolean {
        return this.player.isAlive;
    }

    get deathPhaseType(): string {
        if (this.player.timeOfDeath !== undefined) {
            return this.player.timeOfDeath.type;
        }

        return "night";
    }

    get dayOfDeath(): number {
        if (this.player.timeOfDeath !== undefined) {
            return this.player.timeOfDeath.index + 1;
        }

        return 1;
    }

    edit(): void {
        this.isEditName = true;
        Vue.nextTick(() => {
            (this.$refs.edit as HTMLInputElement).focus();
        });
    }

    toggleAlive(): void {
        const phase: Phase = this.player.timeOfDeath || {
            type: PhaseType.NIGHT,
            index: this.$store.getters.selectedDay || 1,
        };
        this.$store.commit("setDeathStatus", {
            player: this.name,
            isAlive: !this.player.isAlive,
            timeOfDeath: phase,
        });
    }

    switchDeathPhaseType(): void {
        let phase: Phase = this.player.timeOfDeath || {
            type: PhaseType.NIGHT,
            index: 1,
        };
        if (phase.type === PhaseType.NIGHT) {
            phase.type = PhaseType.DAY;
        } else {
            phase.type = PhaseType.NIGHT;
        }
        this.$store.commit("setDeathStatus", {
            player: this.name,
            isAlive: this.player.isAlive,
            timeOfDeath: phase,
        });
    }

    editDeathTime(): void {
        this.isEditDeathTime = true;
        Vue.nextTick(() => {
            (this.$refs.editDeathTime as HTMLInputElement).focus();
        });
    }

    saveDeathDay(e: Event): void {
        let phase: Phase = this.player.timeOfDeath || {
            type: PhaseType.NIGHT,
            index: 1,
        };
        phase.index = parseInt((e.target as HTMLInputElement).value) - 1;
        this.$store.commit("setDeathStatus", {
            player: this.name,
            isAlive: this.player.isAlive,
            timeOfDeath: phase,
        });
        this.isEditDeathTime = false;
    }

    handleKeyupDeathDay(e: KeyboardEvent): void {
        if (e.keyCode === 13) {
            this.saveDeathDay(e);
        }
    }

    handleKeyupAlias(e: KeyboardEvent): void {
        if (e.keyCode === 13) {
            this.addAlias(e);
        }
    }

    addAlias(e: Event): void {
        const alias = (e.target as HTMLInputElement).value;
        if (alias.length) {
            this.$store.commit("addAlias", {
                player: this.name,
                alias: alias,
            });
            this.isAddAlias = false;
        }
    }

    removeAlias(alias: string): void {
        this.$store.commit("removeAlias", {
            player: this.name,
            alias: alias,
        });
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
.dead-player {
    opacity: 0.6;
    text-decoration: line-through;
}

.player-item {
    display: inline-block;
}

.player-name label {
    cursor: text;
}

.death-selection {
    display: inline-block;
}

.aliases {
    display: inline-block;
}
</style>
