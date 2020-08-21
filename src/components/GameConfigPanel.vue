<template>
    <div class="fmu-panel">
        <div>
            <ModeratorList />
        </div>
        <div>
            <div class="general-setting">
                <label>Vote keyword</label>
                <input type="text" :value="voteKeyword" size="12" @blur="setVoteKeyword" />
            </div>
            <div class="general-setting">
                <label>Unvote keyword</label>
                <input type="text" :value="unvoteKeyword" size="12" @blur="setUnvoteKeyword" />
            </div>
            <div class="general-setting">
                <label>Night time</label>
                <input type="time" :value="nightTime" @blur="setNightTime" required="required" />
            </div>
            <div class="general-setting">
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
    name: "GameConfigPanel",
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
    font: inherit;
    padding: 4px;
}
.general-setting {
    margin: 4px 0;
}
</style>
