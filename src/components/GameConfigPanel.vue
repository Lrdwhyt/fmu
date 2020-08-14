<template>
    <div>
        <div>
            <moderator-list />
        </div>
        <div id="general-settings">
            <div>
                <label>Vote keyword</label>
                <input type="text" :value="voteKeyword" @blur="setVoteKeyword" />
            </div>
            <div>
                <label>Unvote keyword</label>
                <input type="text" :value="unvoteKeyword" @blur="setUnvoteKeyword" />
            </div>
            <div>
                <label>Night time</label>
                <input type="time" :value="nightTime" @blur="setNightTime" required="required" />
            </div>
            <div>
                <label title="How long each day lasts in hours">Day length</label>
                <input type="number" size="4" :value="dayLength" @blur="setDayLength" />
                hours
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ModeratorList from "./Moderators/ModeratorList.vue";

@Component({
    name: "game-config-panel",
    components: {
        ModeratorList,
    },
})
export default class GameConfigPanel extends Vue {
    get voteKeyword(): string {
        return this.$store.getters.voteKeyword;
    }

    get unvoteKeyword(): string {
        return this.$store.getters.unvoteKeyword;
    }

    get nightTime(): string {
        return this.$store.getters.nightTime;
    }

    get dayLength(): number {
        return this.$store.getters.dayLength;
    }

    setVoteKeyword(e: Event) {
        this.$store.commit("setVoteKeyword", (e.target as HTMLInputElement).value);
    }

    setUnvoteKeyword(e: Event) {
        this.$store.commit("setUnvoteKeyword", (e.target as HTMLInputElement).value);
    }

    setNightTime(e: Event) {
        this.$store.commit("setNightTime", (e.target as HTMLInputElement).value);
    }

    setDayLength(e: Event) {
        this.$store.commit("setDayLength", (e.target as HTMLInputElement).value);
    }
}
</script>

<style scoped>
input {
    font-family: inherit;
}
input {
    padding: 4px;
}
#general-settings > div {
    margin: 4px 0;
}
</style>
