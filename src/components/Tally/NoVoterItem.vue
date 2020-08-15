<template>
    <div class="voter">
        <label>{{ player }}</label>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
    name: "nonvoter",
    components: {},
})
export default class NoVoterItem extends Vue {
    @Prop() private player!: string;
}
</script>

<style scoped>
div {
    display: inline-block;
}

label {
    display: inline-block;
    padding: 4px;
}

.voter {
    background-color: rgb(215, 215, 231);
    margin: 4px;
}
</style>
