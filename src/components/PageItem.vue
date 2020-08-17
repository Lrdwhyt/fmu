<template>
    <a :href="link" :class="[className, selected ? 'selected' : '']" :title="description">{{ index }}</a>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { getTotalPages, getThreadId, getCurrentPage } from "@/forums-of-loathing/Parser";

@Component({
    name: "page-item",
    components: {},
})
export default class PageItem extends Vue {
    @Prop() private index!: number;
    private threadId: number = getThreadId();
    private currentPage: number = getCurrentPage();

    get className(): string {
        if (this.index in this.$store.getters.rawGameData) {
            if (this.$store.getters.postsPerPage * this.index === this.$store.getters.rawGameData[this.index].last) {
                return "full";
            } else {
                return "partial";
            }
        } else {
            return "empty";
        }
    }

    get selected(): boolean {
        return this.index === this.currentPage;
    }

    get link(): string {
        return `http://forums.kingdomofloathing.com/vb/showthread.php?t=${this.threadId}&page=${this.index}`;
    }

    get description(): string {
        if (this.className === "full") {
            return `${this.index}: full data`;
        } else if (this.className === "partial") {
            return `${this.index}: partial data`;
        } else {
            return `${this.index}: no data`;
        }
    }
}
</script>

<style scoped>
a {
    color: #222;
    display: inline-block;
    padding: 7px;
    text-decoration: none;
}

.selected {
    border-bottom: 3px solid rgb(233, 0, 140);
    padding: 7px 7px 4px;
}

.empty {
    background-color: #69647f;
    color: #ccc;
}

.empty:hover {
    background-color: #504d62;
}

.partial {
    background-color: #b7b5c5;
    color: #fff;
}

.partial:hover {
    background-color: #9995ac;
}

.full {
    background-color: #f5f4f7;
}

.full:hover {
    background-color: #E0DFE6;
}
</style>
