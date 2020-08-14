<template>
    <div>
        <table>
            <tr v-for="(title, id) in activeGameList" v-bind:key="id">
                <td>{{ title }}</td>
                <td>{{ getMemoryUsageByGame(id) }} MB</td>
                <td><button @click="clear(parseInt(id))">Clear</button></td>
            </tr>
        </table>

        <div>Total memory usage: {{ memoryUsed() }}</div>
        <button @click="resetAll">Reset</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { totalMemoryUsed, memoryUsageByGame, reset } from "../LocalStorageManager";
import { mapGetters } from "vuex";
import { getThreadId } from "../forums-of-loathing/Parser";

@Component({
    name: "memory-panel",
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

<style scoped></style>
