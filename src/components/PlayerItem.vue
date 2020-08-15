<template>
    <tr class="player-item" :class="{ 'dead-player': !isAlive }">
        <td>
            <div class="player-name word-edit" v-if="isEditName">
                <input type="text" ref="editName" :value="this.$props.name" size="16" @blur="changeName" @keyup="keyupChangeName" />
            </div>
            <div class="player-name word-view" v-else>
                <label @click="startEditName">{{ this.$props.name }}</label
                ><button class="remove-button" @click="remove">🗙</button>
            </div>
        </td>
        <td>
            <button class="status-indicator" :class="lifeString" @click="toggleAlive">{{ lifeString }}</button>
        </td>
        <td>
            <div class="death-selection word-view" v-if="!isAlive">
                <button @click="switchDeathPhaseType">{{ deathPhaseType }}</button
                ><input
                    type="number"
                    ref="editDeathTime"
                    v-if="isEditDeathTime"
                    :value="dayOfDeath"
                    size="2"
                    @blur="saveDeathDay"
                    @keyup="handleKeyupDeathDay"
                />
                <button @click="editDeathTime" v-else>{{ dayOfDeath }}</button>
            </div>
        </td>
        <td class="aliases">
            <div class="word-view" v-for="alias in aliases" :key="alias">
                <label>{{ alias }}</label
                ><button class="remove-button" @click="removeAlias(alias)">🗙</button>
            </div>
            <input type="text" ref="aliasInput" v-if="isAddAlias" @blur="addAlias" @keyup="handleKeyupAlias" />
            <button class="fmu-button" @click="showAddAlias">+</button>
        </td>
    </tr>
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
    @Prop() private player!: Player;
    private isEditName: boolean = false;
    private isAddAlias: boolean = false;
    private isEditDeathTime: boolean = false;

    get aliases(): string[] {
        return this.$props.player.aliases || [];
    }

    get lifeString(): string {
        if (this.$props.player.isAlive) {
            return "alive";
        } else {
            return "dead";
        }
    }

    get isAlive(): boolean {
        return this.$props.player.isAlive;
    }

    get deathPhaseType(): string {
        if (this.$props.player.timeOfDeath !== undefined) {
            return this.$props.player.timeOfDeath.type;
        }

        return PhaseType.NIGHT;
    }

    get dayOfDeath(): number {
        if (this.$props.player.timeOfDeath !== undefined) {
            return this.$props.player.timeOfDeath.index + 1;
        }

        return 1;
    }

    startEditName(): void {
        this.isEditName = true;
        Vue.nextTick(() => {
            (this.$refs.editName as HTMLInputElement).focus();
        });
    }

    toggleAlive(): void {
        const phase: Phase = this.$props.player.timeOfDeath || {
            type: PhaseType.NIGHT,
            index: this.$store.getters.selectedDay || 1,
        };
        this.$store.commit("setDeathStatus", {
            player: this.name,
            isAlive: !this.$props.player.isAlive,
            timeOfDeath: phase,
        });
    }

    switchDeathPhaseType(): void {
        let phase: Phase = this.$props.player.timeOfDeath || {
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
            isAlive: this.$props.player.isAlive,
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
        let phase: Phase = this.$props.player.timeOfDeath || {
            type: PhaseType.NIGHT,
            index: 1,
        };
        phase.index = parseInt((e.target as HTMLInputElement).value) - 1;
        this.$store.commit("setDeathStatus", {
            player: this.name,
            isAlive: this.$props.player.isAlive,
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

    showAddAlias(): void {
        this.isAddAlias = !this.isAddAlias;
        Vue.nextTick(() => {
            (this.$refs.aliasInput as HTMLInputElement).focus();
        });
    }

    keyupChangeName(e: KeyboardEvent) {
        if (e.keyCode === 13) {
            this.changeName(e);
        }
    }

    changeName(e: Event): void {
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
td {
    padding: 0 8px;
}

.dead-player {
    opacity: 0.4;
}

.dead-player label {
    text-decoration: line-through;
}

.player-name {
    background-color: #746c8b;
    color: #fff;
    font-weight: bold;
}

.player-name:hover {
    background-color: #524c63;
}

.player-name label {
    cursor: text;
}

.player-name.word-edit input {
    padding: 3px 5px;
}

.death-selection {
    display: inline-block;
}

.death-selection button {
    border: none;
    padding: 4px;
}

.aliases {
    display: inline-block;
}

.status-indicator {
    border: none;
    opacity: 0.8;
    padding: 4px 6px;
}

.status-indicator:hover {
    opacity: 1;
}

.dead {
    background-color: #ccc;
    color: #333;
}

.alive {
    background-color: #859bdf;
    color: #fff;
}
</style>
