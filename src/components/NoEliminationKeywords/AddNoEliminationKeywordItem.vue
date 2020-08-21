<template>
    <div class="word-edit">
        <input type="text" ref="keyword" @blur="updateRegistration" @keyup="submitInput" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
    name: "AddNoEliminationKeywordItem",
})
export default class AddNoEliminationKeywordItem extends Vue {
    mounted() {
        (this.$refs.keyword as HTMLInputElement).focus();
    }

    submitInput(e: KeyboardEvent) {
        if (e.keyCode === 13) {
            this.updateRegistration(e);
        }
    }

    updateRegistration(e: Event) {
        const value = (e.target as HTMLInputElement).value;
        if (value) {
            this.$store.commit("addNoEliminationKeyword", value);
            this.$emit("register");
        }
    }
}
</script>

<style scoped></style>
