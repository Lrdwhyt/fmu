<template>
    <div class="fmu-panel">
        <p>
            Forum Mafia Utilities uses localStorage to store its data. Typically, browsers allow about 5 MB of storage per domain. For long-term
            usage, it is necessary to periodically clear out unused memory.
        </p>
        <table>
            <tr class="heading">
                <td>Title</td>
                <td>Memory</td>
                <td></td>
            </tr>
            <tr v-for="(title, id) in activeGameList" v-bind:key="id">
                <td>{{ title }}</td>
                <td>{{ getMemoryUsageByGame(id) }} MB</td>
                <td><button class="fmu-button" @click="clear(parseInt(id))">Clear</button></td>
            </tr>
        </table>

        <p> Total memory usage: {{ memoryUsed() }} </p>
        <div class="reset-button">
            <button
                class="fmu-button"
                @click="resetAll"
                title="Reset all data stored in localStorage, including game data and Forum Mafia Utilities settings"
            >
                Reset all data
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { totalMemoryUsed, memoryUsageByGame, reset } from "../LocalStorageManager";
import { getThreadId } from "../forums-of-loathing/Parser";

@Component({
    name: "MemoryPanel",
})
export default class MemoryPanel extends Vue {
    memoryUsed(): string {
        return "~" + totalMemoryUsed() + " / 5 MB";
    }

    get activeGameList() {
        return this.$store.getters.activeGameList;
    }

    getMemoryUsageByGame(id: number): number {
        return memoryUsageByGame(id);
    }

    clear(id: number) {
        if (getThreadId() === id) {
            this.$store.dispatch("stopGame");
        } else {
            this.$store.dispatch("deleteGame", id);
        }
    }

    resetAll(): void {
        this.$store.dispatch("stopGame");
        reset();
    }
}
</script>

<style scoped>
table {
    border-collapse: collapse;
}

td {
    padding: 6px 8px;
}

.heading td {
    background-color: #dddde7;
    font-weight: bold;
}

.reset-button {
    margin-top: 4px;
}
</style>
