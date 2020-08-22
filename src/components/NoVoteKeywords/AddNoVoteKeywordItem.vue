<template>
    <div class="word-edit">
        <input type="text" ref="keyword" @blur="handleAddKeyword" @keyup="handleKeyup" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
    name: "AddNoVoteKeywordItem",
})
export default class AddNoVoteKeywordItem extends Vue {
    mounted() {
        (this.$refs.keyword as HTMLInputElement).focus();
    }

    handleKeyup(e: KeyboardEvent) {
        if (e.keyCode === 13) {
            this.handleAddKeyword(e);
        }
    }

    handleAddKeyword(e: Event) {
        const keyword = (e.target as HTMLInputElement).value;
        if (keyword) {
            this.$store.commit("addNoVoteKeyword", keyword);
            this.$emit("register");
        }
    }
}
</script>

<style scoped></style>
