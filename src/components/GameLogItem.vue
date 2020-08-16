<template>
    <tr>
        <td>
            {{ time }}
        </td>
        <td>
            <a :href="linkPost($props.event)">{{ location }}</a>
        </td>
        <td>
            {{ user }}
        </td>
        <td v-if="isVote">
            <strong>{{ content }}</strong>
        </td>
        <td :title="fullContent" v-else>
            {{ content }}
        </td>
    </tr>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Vote, VoteType } from "@/Vote";
import { Day } from "@/Day";
import { filterByDay } from "@/VoteFilter";
import { linkPost } from "@/forums-of-loathing/LinkUtils";

@Component({
    name: "game-log-item",
    components: {},
})
export default class GameLogItem extends Vue {
    @Prop() private event!: any;
    @Prop() private index!: number;

    get location(): number {
        return this.$props.index;
    }

    get time(): string {
        return new Date(this.$props.event.time).toLocaleString();
    }

    get user(): string {
        return this.$props.event.user;
    }

    get isVote(): boolean {
        return !this.$store.getters.moderatorList.includes(this.user);
    }

    get content(): string {
        if (this.fullContent.length > 400) {
            return this.fullContent.substr(0, 300) + "...";
        } else {
            return this.fullContent;
        }
    }

    get fullContent(): string {
        return this.$props.event.content;
    }

    linkPost(vote: Vote): string {
        return linkPost(vote);
    }
}
</script>

<style scoped></style>
