<template>
    <div class="moderator-list">
        <label>Game moderators</label>
        <template v-for="moderator in moderators">
            <moderator-item v-bind:key="moderator" :moderator="moderator" />
        </template>
        <add-moderator-item v-if="isAddModerator" @register="hideInput" />
        <button @click="addModerator">+</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ModeratorItem from "./ModeratorItem.vue";
import AddModeratorItem from "./AddModeratorItem.vue";

@Component({
    name: "moderator-list",
    components: {
        ModeratorItem,
        AddModeratorItem,
    },
})
export default class ModeratorList extends Vue {
    private isAddModerator: boolean = false;

    get moderators() {
        return this.$store.getters.moderatorList;
    }

    addModerator() {
        this.isAddModerator = true;
    }

    hideInput() {
        this.isAddModerator = false;
    }
}
</script>

<style scoped>
.moderator-list > div {
    margin: 4px;
}
</style>
