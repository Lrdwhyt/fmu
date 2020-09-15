<template>
    <tr class="player-item" :class="{ 'dead-player': !isAlive }">
        <td class="player-name-col">
            <div class="player-name word-edit" v-if="isEditName">
                <input
                    type="text"
                    ref="editName"
                    :value="this.$props.name"
                    size="16"
                    @blur="changeName"
                    @keyup="keyupChangeName"
                />
            </div>
            <div class="player-name word-view" v-else>
                <label @click="startEditName">{{ this.$props.name }}</label
                ><button class="remove-button" @click="remove">🗙</button>
            </div>
        </td>
        <td>
            <button class="status-indicator" :class="lifeString" @click="toggleAlive">{{
                lifeString
            }}</button>
        </td>
        <td>
            <div class="death-selection word-view" v-if="!isAlive">
                <button class="phase-type" :class="deathPhaseType" @click="switchDeathPhaseType">{{
                    deathPhaseType
                }}</button
                ><input
                    type="number"
                    ref="editDeathTime"
                    v-if="isEditDeathTime"
                    :value="dayOfDeath"
                    size="2"
                    @blur="saveDeathDay"
                    @keyup="handleKeyupDeathDay"
                />
                <button class="phase-index" @click="editDeathTime" v-else>{{ dayOfDeath }}</button>
            </div>
        </td>
        <td>
            <select
                @change="changeGroup"
                v-model="selectedGroup"
                :style="{ color: selectedGroupColor }"
            >
                <option
                    v-for="(color, group) in groups"
                    :key="group"
                    :value="group"
                    :style="{ color: color }"
                    >{{ group }}</option
                >
            </select>
        </td>
        <td>
            <div class="aliases">
                <div class="word-view alias" v-for="alias in aliases" :key="alias">
                    <label>{{ alias }}</label
                    ><button class="remove-button" @click="removeAlias(alias)">🗙</button>
                </div>
                <input
                    type="text"
                    ref="aliasInput"
                    v-if="showAddAlias"
                    placeholder="Alias"
                    @blur="addAlias"
                    @keyup="handleKeyupAlias"
                />
                <button class="fmu-button" @click="toggleAddAlias">+</button>
            </div>
        </td>
        <td class="player-notes" v-show="isEditNotes">
            <textarea ref="editNotes" :value="notes" @blur="saveNotes" />
        </td>
        <td class="player-notes" v-show="!isEditNotes" @click="editNotes">{{ notes }}</td>
    </tr>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Player } from "@/Player";
import { PhaseType, Phase } from "@/Phase";

@Component({
    name: "PlayerItem",
})
export default class PlayerItem extends Vue {
    @Prop() private name!: string;
    @Prop() private player!: Player;

    private isEditName: boolean = false;
    private showAddAlias: boolean = false;
    private isEditDeathTime: boolean = false;
    private isEditNotes: boolean = false;

    get aliases(): string[] {
        return this.$props.player.aliases || [];
    }

    get selectedGroup(): string {
        return this.$props.player.group || "none";
    }

    get selectedGroupColor(): string {
        return this.$store.getters.color(this.selectedGroup);
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
        if (this.$props.player.timeOfDeath === undefined) {
            return PhaseType.NIGHT;
        }

        return this.$props.player.timeOfDeath.type;
    }

    get dayOfDeath(): number {
        if (this.$props.player.timeOfDeath === undefined) {
            return 1;
        }

        return this.$props.player.timeOfDeath.index + 1;
    }

    get groups(): { [group: string]: string } {
        return this.$store.getters.groups;
    }

    get notes(): string {
        return this.$props.player.notes ?? "";
    }

    startEditName(): void {
        this.isEditName = true;
        Vue.nextTick(() => {
            (this.$refs.editName as HTMLInputElement).focus();
        });
    }

    changeGroup(e: Event): void {
        this.$store.commit("changePlayerGroup", {
            player: this.$props.name,
            group: (e.target as HTMLInputElement).value || "none",
        });
    }

    toggleAlive(): void {
        const phase: Phase = this.$props.player.timeOfDeath || {
            type: PhaseType.NIGHT,
            index: this.$store.getters.selectedDay,
        };
        this.$store.commit("setDeathStatus", {
            player: this.name,
            isAlive: !this.$props.player.isAlive,
            timeOfDeath: phase,
        });
    }

    switchDeathPhaseType(): void {
        const phase: Phase = this.$props.player.timeOfDeath || {
            type: PhaseType.NIGHT,
            index: this.$store.getters.selectedDay,
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
            index: this.$store.getters.selectedDay,
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
            this.showAddAlias = false;
        }
    }

    removeAlias(alias: string): void {
        this.$store.commit("removeAlias", {
            player: this.name,
            alias: alias,
        });
    }

    toggleAddAlias(): void {
        this.showAddAlias = !this.showAddAlias;
        if (this.showAddAlias) {
            Vue.nextTick(() => {
                (this.$refs.aliasInput as HTMLInputElement).focus();
            });
        }
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

    editNotes(e: MouseEvent): void {
        this.isEditNotes = true;
        // make textarea as wide as text
        (this.$refs.editNotes as HTMLTextAreaElement).style.width = window.getComputedStyle(
            e.target as HTMLElement
        ).width;
        Vue.nextTick(() => {
            (this.$refs.editNotes as HTMLTextAreaElement).focus();
        });
    }

    saveNotes(e: Event): void {
        const noteContents = (e.target as HTMLTextAreaElement).value ?? "";
        this.$store.commit("saveNotes", {
            name: this.$props.name,
            content: noteContents,
        });
        this.isEditNotes = false;
    }
}
</script>

<style scoped>
td {
    border: none;
    padding: 6px 8px 0;
}

input,
select,
option {
    font: inherit;
    padding: 4px;
}

select {
    background: transparent;
    border: none;
}

.dead-player .player-name {
    opacity: 0.4;
}

.dead-player label {
    text-decoration: line-through;
}

.dead-player .alias {
    opacity: 0.4;
}

.player-name {
    background-color: #746c8b;
    color: #fff;
}

.player-name:hover {
    background-color: #524c63;
}

.player-name label {
    cursor: text;
    font-weight: bold;
}

.player-name.word-edit input {
    padding: 3px 5px;
}

select {
    padding: 4px;
}

.death-selection {
    display: inline-block;
}

.death-selection button {
    border: none;
    font: inherit;
    padding: 4px 6px;
}

.aliases {
    display: inline-block;
}

.alias {
    margin-right: 5px;
}

.status-indicator {
    border: none;
    font: inherit;
    opacity: 0.7;
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
    background-color: #6175e1;
    color: #fff;
}

.phase-index {
    background-color: #fff;
}

.phase-index:hover {
    background-color: #eee;
}

.night {
    background-color: #5d5d82;
    color: #fff;
}

.night:hover {
    background-color: #40405c;
}

.day {
    background-color: #bdcde6;
}

.day:hover {
    background-color: #cfdff8;
}

.player-notes {
    white-space: pre-wrap;
}

.player-name-col {
    white-space: nowrap;
}
</style>
