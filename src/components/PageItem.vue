<template>
    <a :href="link" :class="className">{{ index }}</a>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { getTotalPages, getThreadId } from "@/forums-of-loathing/Parser";

@Component({
    name: "page-item",
    components: {},
})
export default class PageItem extends Vue {
    @Prop() private index!: number;
    private threadId: number = getThreadId();

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

    get link(): string {
        return `http://forums.kingdomofloathing.com/vb/showthread.php?t=${this.threadId}&page=${this.index}`;
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

a:hover {
    opacity: 0.8;
}

.empty {
    background-color: rgb(124, 124, 124);
    color: #fff;
}

.partial {
    background-color: rgb(180, 180, 180);
}

.full {
    background-color: rgb(223, 223, 223);
}
</style>
