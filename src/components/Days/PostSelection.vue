<template>
    <div
        class="day-boundary-option word-view"
        :class="{ selected: isSelected }"
        @click="handleClick"
    >
        <input
            type="number"
            ref="edit"
            :value="post"
            v-if="isEditing"
            size="10"
            @blur="stopEdit"
            @keyup="handleKeyup"
        />
        <label v-else>Post #{{ post }}</label>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Day, DayBoundaryType } from "@/Day";

@Component({
    name: "PostSelection",
    components: {},
})
export default class PostSelection extends Vue {
    @Prop() private type!: "start" | "end";
    @Prop() private activeDay!: number;

    private isEditing: boolean = false;

    get isSelected(): boolean {
        return this.day[this.type].type === DayBoundaryType.POST;
    }

    get day(): Day {
        return this.$store.getters.days[this.activeDay];
    }

    get post(): number {
        return this.$store.getters.days[this.activeDay][this.type].post;
    }

    handleKeyup(e: KeyboardEvent): void {
        if (e.keyCode === 13) {
            this.stopEdit(e);
        }
    }

    stopEdit(e: Event): void {
        this.isEditing = false;
        const postNumber: number = parseInt((e.target as HTMLInputElement).value);
        if (postNumber > 0) {
            this.$store.commit("setDay", {
                day: this.activeDay,
                data: {
                    ...this.day,
                    [this.type]: {
                        ...this.day[this.type],
                        post: postNumber,
                    },
                },
            });
        }
    }

    switchDayType() {
        this.$store.commit("setDay", {
            day: this.activeDay,
            data: {
                ...this.day,
                [this.type]: {
                    ...this.day[this.type],
                    type: DayBoundaryType.POST,
                },
            },
        });
    }

    handleClick(e: Event): void {
        if (!this.isSelected) {
            this.switchDayType();
        } else {
            this.isEditing = true;
            Vue.nextTick(() => {
                (this.$refs.edit as HTMLInputElement).focus();
                (this.$refs.edit as HTMLInputElement).select();
            });
        }
    }
}
</script>

<style scoped>
.word-view label {
    padding: 4px 6px;
}
input {
    font-family: inherit;
    font-size: 13px;
    padding: 4px;
}

.day-boundary-option {
    display: inline-block;
}

.selected {
    border-bottom: 3px solid rgb(66, 148, 255);
}

.selected > input {
    padding: 4px 4px 1px 4px;
}

.selected > label {
    padding: 4px 6px 1px 6px;
}
</style>
