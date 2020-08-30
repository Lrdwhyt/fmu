import * as Post from "./Post"
import { parseDate } from './DateParser';
import { PageData, PostData } from '@/GameData';

export function getTimeZone(): number {
    //Get string at bottom which tells time zone
    const els = document.querySelectorAll("div.page .smallfont");
    let time: string = els[els.length - 1].textContent || "";
    //Get between "GMT " and ". "
    time = time.split("GMT")[1].split(". ")[0];

    return parseFloat(time.replace("+", "").trim());
}

const timeZone = getTimeZone();

export function getPosts({ mods, voteKeyword, unvoteKeyword }: { mods: string[], voteKeyword: string, unvoteKeyword: string }): PageData {
    const pageNumber: number = getCurrentPage();

    const thread = document.getElementById("posts");

    if (thread === null) {
        return {};
    }

    const posts = thread.getElementsByClassName("page");

    let pageData: PostData = {};

    for (const post of posts) {
        const postData: PostData = getPostData(post, {
            mods,
            voteKeyword,
            unvoteKeyword
        });

        pageData = {
            ...pageData,
            ...postData
        }
    }

    const lastPostNumber = Post.getNumber(posts[posts.length - 1]);
    pageData = {
        ...pageData,
        last: lastPostNumber
    };

    return {
        [pageNumber]: pageData
    };
}

export function getPostData(post: Element, { mods, voteKeyword, unvoteKeyword }: { mods: string[], voteKeyword: string, unvoteKeyword: string }): PostData {
    const username: string = Post.getUsername(post);

    let content: string = "";

    if (mods.includes(username.toLowerCase())) {
        content = Post.getContent(post);
    } else {
        let boldText: string[] = Post.getBoldText(post).filter((msg: string) => {
            const lower = msg.toLowerCase();
            return lower.includes(voteKeyword) || lower.includes(unvoteKeyword);
        });

        if (boldText.length > 0) {
            content = boldText.slice(-1)[0];
        }
    }

    if (content.length === 0) {
        return {};
    }

    const timestamp: Date = parseDate(Post.getTime(post), timeZone);
    const postId = Post.getId(post);
    const postNumber = Post.getNumber(post);

    return {
        [postNumber]: {
            user: username,
            content: content,
            link: postId,
            time: timestamp
        }
    }
}

export function getCurrentPage(): number {
    const el = document.querySelector(".pagenav td.vbmenu_control:first-child");

    if (el === null) {
        return 1;
    }

    const pageString: string = el.textContent || "";

    if (pageString.length > 0) {
        return parseInt(pageString.split(" ")[1]);
    } else {
        return 1;
    }
}

export function getTotalPages(): number {
    const el = document.querySelector(".pagenav td.vbmenu_control:first-child");

    if (el === null) {
        return 1;
    }

    const pageString: string = el.textContent || "";

    if (pageString.length > 0) {
        return parseInt(pageString.split(" ")[3]);
    } else {
        return 1;
    }
}

export function getThreadId(): number {
    const el = document.getElementById("tag_edit_link") as HTMLAnchorElement;
    const href = el.href;
    const id = href.split("&")[0].split("=")[1];

    return parseInt(id);
}

export function getThreadTitle(): string {
    const title: string = document.title;
    const index: number = title.lastIndexOf("-");

    return document.title.substring(0, index);
}

export function getFirstPoster(): string {
    const thread = document.getElementById("posts");

    if (thread === null) {
        return "";
    }

    const posts = thread.getElementsByClassName("page");

    if (posts.length > 0) {
        return Post.getUsername(posts[0]);
    }

    return "";
}