<template>
    <div>
        <ol class="page-list">
            <li class="page-list-label"><div>Page</div></li
            ><li v-for="page in totalPages" v-bind:key="page">
                <page-item :index="page" />
            </li>
        </ol>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import PageItem from "./PageItem.vue";
import { getTotalPages } from "@/forums-of-loathing/Parser";

@Component({
    name: "page-list",
    components: {
        PageItem,
    },
})
export default class PageList extends Vue {
    private totalPages: number = getTotalPages();
}
</script>

<style scoped>
ol {
    list-style: none;
    padding: 0;
}

li {
    display: inline-block;
    list-style-type: none;
    padding: 0;
}

.page-list-label {
    background-color: #e91e63;
}

.page-list-label div {
    display: inline-block;
    padding: 7px;
}
</style>
