<template>
    <tr>
        <td>
            {{ time }}
        </td>
        <td>
            <a :href="linkPost($props.event.link)">#{{ location }}</a>
        </td>
        <td>
            {{ user }}
        </td>
        <td v-if="isVote">
            <strong>{{ content }}</strong>
        </td>
        <td @click="expand" v-else>
            <span class="expanded-text" v-if="isExpanded">{{ fullContent }}</span>
            <span :title="fullContent" v-else>{{ content }}</span>
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
    name: "GameLogItem",
})
export default class GameLogItem extends Vue {
    @Prop() private event!: any;
    @Prop() private index!: number;
    private isExpanded: boolean = false;

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

    expand(): void {
        this.isExpanded = !this.isExpanded;
    }

    linkPost(postId: string): string {
        return linkPost(postId);
    }
}
</script>

<style scoped>
.expanded-text {
    white-space: pre-wrap;
}

tr:hover td {
    background-color: #fff;
}

td {
    padding: 2px 6px;
}
</style>
