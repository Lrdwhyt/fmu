<template>
    <div class="voter">
        <label :style="{ color: colour }">{{ player }}</label>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
    name: "nonvoter",
    components: {},
})
export default class NoVoteItem extends Vue {
    @Prop() private player!: string;

    get colour(): string {
        if (!this.useColours) {
            return "";
        }

        const group = this.$store.getters.player(this.player).group || "none";
        const groupColour = this.$store.getters.color(group) || "#000";

        return groupColour;
    }

    get useColours(): boolean {
        return this.$store.getters.useColours;
    }
}
</script>

<style scoped>
div {
    display: inline-block;
}

label {
    display: inline-block;
    padding: 4px 6px;
}

.voter {
    background-color: #fff;
    box-shadow: var(--card-shadow);
    margin: 4px;
}
</style>
