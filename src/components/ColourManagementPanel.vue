<template>
    <div class="fmu-panel">
        <table>
            <tr v-for="(color, group) in groups" :key="group">
                <td>
                    <div class="word-view">
                        <label :style="{ color: color }">{{ group }}</label
                        ><button
                            class="remove-button"
                            @click="remove(group)"
                            v-if="isRemovable(group)"
                            >🗙</button
                        >
                    </div>
                </td>
                <td>
                    <input
                        type="color"
                        class="color-picker"
                        :value="color"
                        @change="changeColour($event, group)"
                    />
                </td>
            </tr>
        </table>

        <div class="add-group">
            <input type="text" ref="newGroup" placeholder="Group" @keyup="handleKeyup" />
            <button class="fmu-button" @click="handleAddGroup">Add</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    name: "ColourManagementPanel",
})
export default class ColourManagementPanel extends Vue {
    get groups(): { [group: string]: string } {
        return this.$store.getters.groups;
    }

    isRemovable(group: string): boolean {
        return group !== "none";
    }

    remove(group: string): void {
        this.$store.commit("removeGroup", group);
    }

    changeColour(e: Event, group: string): void {
        const colour = (e.target as HTMLInputElement).value;
        this.$store.commit("changeColour", {
            [group]: colour,
        });
    }

    handleKeyup(e: KeyboardEvent): void {
        if (e.keyCode === 13) {
            this.handleAddGroup();
        }
    }

    handleAddGroup(): void {
        const name = (this.$refs.newGroup as HTMLInputElement).value;
        if (name.length) {
            this.$store.commit("handleAddGroup", name);
            (this.$refs.newGroup as HTMLInputElement).value = "";
        }
    }
}
</script>

<style scoped>
.word-view > label {
    padding: 4px 6px;
}

td {
    padding: 2px 4px;
}

input {
    font: inherit;
    padding: 4px;
}

.color-picker {
    border: none;
    display: inline-block;
    padding: 0;
}

.add-group {
    margin-top: 5px;
    padding: 4px;
}
</style>
