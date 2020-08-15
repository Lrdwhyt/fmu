<template>
    <div class="fmu-panel">
        Colours
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    name: "colour-management-panel",
})
export default class ColourManagementPanel extends Vue {
    get groups() {
        return 0;
    }
}
</script>

<style scoped></style>
